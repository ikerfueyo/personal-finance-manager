const express = require('express');
const { Income } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Create income
router.post('/', auth, async (req, res, next) => {
  const { amount, source, date } = req.body;
  try {
    const income = await Income.create({ amount, source, date, userId: req.user.id });
    res.status(201).json(income);
  } catch (err) {
    next(err);
  }
});

// Get all incomes for logged-in user
router.get('/', auth, async (req, res, next) => {
  try {
    const incomes = await Income.findAll({ where: { userId: req.user.id } });
    res.json(incomes);
  } catch (err) {
    next(err);
  }
});

// Update income by ID
router.put('/:id', auth, async (req, res, next) => {
  const { amount, source, date } = req.body;
  try {
    let income = await Income.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!income) return res.status(404).json({ msg: 'Income not found' });
    income.amount = amount || income.amount;
    income.source = source || income.source;
    income.date = date || income.date;
    await income.save();
    res.json(income);
  } catch (err) {
    next(err);
  }
});

// Delete income by ID
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const income = await Income.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!income) return res.status(404).json({ msg: 'Income not found' });
    await income.destroy();
    res.json({ msg: 'Income removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
