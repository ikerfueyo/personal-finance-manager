const request = require('supertest');
const app = require('../index');
const { Income, User } = require('../models');
const jwt = require('jsonwebtoken');

describe('GET /income', () => {
  let token;
  let userId;

  // Setup
  beforeAll(async () => {
    const testUser = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'hashedpassword',
    });
    userId = testUser.id;
    token = jwt.sign({ user: { id: testUser.id } }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
  });

  // Cleanup
  afterAll(async () => {
    await Income.destroy({ where: { userId } });
    await User.destroy({ where: { id: userId } });
    await sequelize.close();
  });

  it('should fetch all incomes for a logged-in user', async () => {
    await Income.create({ amount: 100, source: 'Job', date: '2023-01-01', userId });
    const res = await request(app)
      .get('/api/income')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should not allow access to income without a valid token', async () => {
    const res = await request(app)
      .get('/api/income');
      // No Authorization header
    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe('No token, authorization denied');
  });
});
