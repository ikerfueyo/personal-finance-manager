const request = require('supertest');
const app = require('../index');
const { User } = require('../models');

// Cleanup
afterAll(async () => {
  await sequelize.close();
});


describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('POST /auth/login', () => {
  it('should log in a user with valid credentials and return a token', async () => {
    // Assuming user already created for testing
    const testUser = await User.create({ 
      email: 'testuser@example.com', 
      password: 'hashedpassword', // Make sure password is hashed correctly 
    });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123' // Assume bcrypt is used to compare this
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail to log in a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(404); // Invalid user status
    expect(res.body.msg).toBe('User not found');
  });
});
