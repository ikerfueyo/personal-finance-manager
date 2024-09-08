const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

// Registration route
router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Receive user data
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Hash password (bcrypt)
    const salt = await bcrypt.genSalt(10);
    // Save user
    user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, salt)
    });
    const payload = {
      user: {
        id: user.id
      }
    };
    // Create/send JWT token
    jwt.sign(payload, 'secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    next(err);
  }
});

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Login route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    // Create/send JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;