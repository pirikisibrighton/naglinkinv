const db = require('../models');
const Quote = db.Quote;
const Order = db.Order;

// Customer requests a quote
const requestQuote = async (req, res) => {
  try {
    const {
      pickupCity,
      deliveryCity,
      goodsType,
      preferredService,
      orderId
    } = req.body;
    
    const quote = await Quote.create({
      customerId: req.userId,
      orderId: orderId || null,
      pickupCity,
      deliveryCity,
      goodsType,
      preferredService,
      status: 'pending'
    });
    
    res.status(201).json({
      message: 'Quote requested successfully. Admin will review and provide price.',
      quote
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error requesting quote', error: error.message });
  }
};

// Get customer's own quotes
const getMyQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      where: { customerId: req.userId },
      include: [{ model: Order, as: 'order', attributes: ['id', 'status'] }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ quotes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};

// Admin provides price for a quote
const provideQuotePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { estimatedPrice } = req.body;
    
    const quote = await Quote.findByPk(id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    await quote.update({
      estimatedPrice,
      status: 'approved'
    });
    
    res.json({
      message: 'Quote price provided successfully',
      quote
    });
  } catch (error) {
    res.status(500).json({ message: 'Error providing quote price', error: error.message });
  }
};

// Get all quotes (Admin only)
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      include: [
        { model: db.User, as: 'customer', attributes: ['username', 'email', 'phone'] },
        { model: Order, as: 'order' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ quotes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};

module.exports = {
  requestQuote,
  getMyQuotes,
  provideQuotePrice,
  getAllQuotes
};