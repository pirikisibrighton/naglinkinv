const db = require('../models');
const Order = db.Order;
const User = db.User;
const Truck = db.Truck;
const Invoice = db.Invoice;
const { Op, Sequelize } = require('sequelize');

// Get dashboard statistics
// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard stats...'); // Debug log
    
    // Get counts
    const totalTrucks = await Truck.count();
    const availableTrucks = await Truck.count({ where: { isAvailable: true } });
    const totalDrivers = await User.count({ where: { role: 'driver' } });
    const totalCustomers = await User.count({ where: { role: 'customer' } });
    
    console.log('Trucks found:', totalTrucks); // Debug log
    console.log('Drivers found:', totalDrivers); // Debug log
    console.log('Customers found:', totalCustomers); // Debug log
    
    // Order statistics
    const pendingOrders = await Order.count({ where: { approvalStatus: 'pending' } });
    const loadingPending = await Order.count({ where: { status: 'loading', loadingApproved: false } });
    const offloadingPending = await Order.count({ where: { status: 'offloading', offloadingApproved: false } });
    const inTransitOrders = await Order.count({ where: { status: 'in_transit' } });
    const completedOrders = await Order.count({ where: { status: 'delivered' } });
    
    // Revenue
    const totalRevenue = await Invoice.sum('amount', { where: { status: 'paid' } }) || 0;
    const pendingPayments = await Invoice.sum('amount', { where: { status: 'pending' } }) || 0;
    
    // Recent orders
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'customer', attributes: ['username'] },
        { model: User, as: 'driver', attributes: ['username'] }
      ]
    });
    
    const stats = {
      trucks: {
        total: totalTrucks,
        available: availableTrucks,
        inUse: totalTrucks - availableTrucks
      },
      drivers: totalDrivers,
      customers: totalCustomers,
      orders: {
        pending: pendingOrders,
        loadingPending: loadingPending,
        offloadingPending: offloadingPending,
        inTransit: inTransitOrders,
        completed: completedOrders
      },
      finances: {
        totalRevenue,
        pendingPayments
      },
      recentOrders
    };
    
    console.log('Stats being sent:', stats); // Debug log
    
    res.json(stats);
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};
// Get all trips with filters
const getAllTrips = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let where = {};
    
    if (status) where.status = status;
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    
    const trips = await Order.findAll({
      where,
      include: [
        { model: User, as: 'customer', attributes: ['username', 'email', 'phone'] },
        { model: User, as: 'driver', attributes: ['username', 'email', 'phone'] },
        { model: Truck, as: 'truck' },
        { model: Invoice, as: 'invoice' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// Admin approves loading document
const approveLoading = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.update({
      loadingApproved: true,
      status: 'in_transit'
    });
    
    res.json({
      message: 'Loading approved. Order is now in transit.',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error approving loading', error: error.message });
  }
};

// Admin approves offloading document (POD)
// Admin approves offloading document (POD)
const approveOffloading = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.update({
      offloadingApproved: true,
      status: 'delivered'
    });
    
    // Free up the truck
    if (order.truckId) {
      await Truck.update({ isAvailable: true }, { where: { id: order.truckId } });
    }
    
    // Free up the driver
    if (order.driverId) {
      await User.update({ isAvailable: true }, { where: { id: order.driverId } });
    }
    
    res.json({
      message: 'Offloading approved. Order completed.',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error approving offloading', error: error.message });
  }
};
// Get expenses
const getExpenses = async (req, res) => {
  try {
    const tripsWithExpenses = await Order.findAll({
      where: {
        status: 'delivered',
        price: {
          [Op.gt]: 0
        }
      },
      attributes: ['id', 'pickupLocation', 'deliveryLocation', 'price', 'createdAt'],
      include: [
        { model: Truck, as: 'truck', attributes: ['truckName', 'licensePlate'] }
      ]
    });
    
    res.json({ expenses: tripsWithExpenses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

// Get cashflow report
const getCashflow = async (req, res) => {
  try {
    const { period } = req.query;
    
    const revenueData = await Invoice.findAll({
      where: { status: 'paid' },
      attributes: [
        [Sequelize.fn('DATE_TRUNC', period || 'day', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
      ],
      group: [Sequelize.fn('DATE_TRUNC', period || 'day', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE_TRUNC', period || 'day', Sequelize.col('createdAt')), 'ASC']]
    });
    
    const pendingData = await Invoice.findAll({
      where: { status: 'pending' },
      attributes: [
        [Sequelize.fn('DATE_TRUNC', period || 'day', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
      ],
      group: [Sequelize.fn('DATE_TRUNC', period || 'day', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE_TRUNC', period || 'day', Sequelize.col('createdAt')), 'ASC']]
    });
    
    res.json({
      revenue: revenueData,
      pending: pendingData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cashflow', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllTrips,
  approveLoading,
  approveOffloading,
  getExpenses,
  getCashflow
};