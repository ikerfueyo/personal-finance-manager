const express = require('express');
const router = express.Router();

// Import all route files
const authRoutes = require('./auth');
const expenseRoutes = require('./expense');
const incomeRoutes = require('./income');

// Mount the routes on the router
router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/incomes', incomeRoutes);

module.exports = router;
