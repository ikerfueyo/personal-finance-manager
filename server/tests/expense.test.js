const request = require('supertest');
const app = require('../index');
const { Expense, User } = require('../models');
const jwt = require('jsonwebtoken');

describe('Expense Routes', () => {
  let token;
  let userId;
  let expenseId;

  // Setup
  beforeAll(async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',  // Assume password already hashed
    });
    userId = user.id;
    token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
  });

  // Cleanup
  afterAll(async () => {
    await Expense.destroy({ where: { userId } });
    await User.destroy({ where: { id: userId } });
    await sequelize.close();
  });

  // Test: Create new expense
  it('should create a new expense', async () => {
    const res = await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 150.0,
        category: 'Food',
        date: '2023-08-01',
        userId: userId
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expenseId = res.body.id;
  });

  // Test: Fetch all expenses for logged-in user
  it('should fetch all expenses for the user', async () => {
    const res = await request(app)
      .get('/api/expense')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test: Update expense
  it('should update the expense', async () => {
    const res = await request(app)
      .put(`/api/expense/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 200.0,
        category: 'Groceries'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.amount).toBe(200.0);
    expect(res.body.category).toBe('Groceries');
  });

  // Test: Delete expense
  it('should delete the expense', async () => {
    const res = await request(app)
      .delete(`/api/expense/${expenseId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Expense removed');
  });

  // Test: Fetch all expenses after deletion
  it('should return an empty array after deleting the expense', async () => {
    const res = await request(app)
      .get('/api/expense')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(0);
  });

  // Test: Access expense route without a token (Unauthorized)
  it('should deny access to the expense route without a valid token', async () => {
    const res = await request(app)
      .get('/api/expense');
      // No Authorization header
    expect(res.statusCode).toEqual(401);
    expect(res.body.msg).toBe('No token, authorization denied');
  });
});
