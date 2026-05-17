const express = require('express');
const { authenticate, isAdmin } = require('../middleware/auth');
const {
  requestQuote,
  getMyQuotes,
  provideQuotePrice,
  getAllQuotes
} = require('../controllers/quoteController');

const router = express.Router();

// Customer routes
router.post('/', authenticate, requestQuote);
router.get('/my-quotes', authenticate, getMyQuotes);

// Admin routes
router.get('/', authenticate, isAdmin, getAllQuotes);
router.put('/:id/price', authenticate, isAdmin, provideQuotePrice);

module.exports = router;