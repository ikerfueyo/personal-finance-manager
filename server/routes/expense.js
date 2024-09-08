const express = require('express');
const { Expense } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Create expense
router.post('/', auth, async (req, res, next) => {
  const { amount, category, date } = req.body;
  try {
    const expense = await Expense.create({ amount, category, date, userId: req.user.id });
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
});

// Get all expenses for logged-in user
router.get('/', auth, async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
});

// Update expense by ID
router.put('/:id', auth, async (req, res, next) => {
  const { amount, category, date } = req.body;
  try {
    let expense = await Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    await expense.save();
    res.json(expense);
  } catch (err) {
    next(err);
  }
});

// Delete expense by ID
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    await expense.destroy();
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
