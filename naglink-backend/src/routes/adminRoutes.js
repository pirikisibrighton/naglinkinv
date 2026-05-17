const express = require('express');
const { authenticate, isAdmin } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllTrips,
  approveLoading,
  approveOffloading,
  getExpenses,
  getCashflow
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate, isAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/trips', getAllTrips);
router.post('/orders/:id/approve-loading', approveLoading);
router.post('/orders/:id/approve-offloading', approveOffloading);
router.get('/expenses', getExpenses);
router.get('/cashflow', getCashflow);

module.exports = router;