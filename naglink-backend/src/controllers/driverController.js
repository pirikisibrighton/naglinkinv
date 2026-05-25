const db = require('../models');
const Order = db.Order;
const User = db.User;
const Truck = db.Truck;

// Driver gets orders assigned to them
const getMyAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { driverId: req.userId },
      include: [
        { model: User, as: 'customer', attributes: ['username', 'email', 'phone', 'companyName'] },
        { model: Truck, as: 'truck' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Driver starts loading - upload loading document with file
const startLoading = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageNumber, weight, loadingNotes } = req.body;
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if driver is assigned to this order
    if (order.driverId !== req.userId) {
      return res.status(403).json({ message: 'Access denied. This order is not assigned to you.' });
    }
    
    // Check if order is in correct state
    if (order.status !== 'approved') {
      return res.status(400).json({ message: `Cannot start loading. Order status is ${order.status}` });
    }
    
    let loadingDocumentUrl = null;
    if (req.file) {
      loadingDocumentUrl = `${req.protocol}://${req.get('host')}/uploads/loading-docs/${req.file.filename}`;
    }
    
    // Update order with loading details
    await order.update({
      packageNumber,
      weight: weight || order.weight,
      loadingNotes,
      loadingDocumentUrl,
      status: 'loading'
    });
    
    res.json({
      message: 'Loading details submitted successfully. Waiting for admin approval.',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating loading details', error: error.message });
  }
};

// Driver uploads offloading document (POD form) with file
const uploadOffloadingDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if driver is assigned to this order
    if (order.driverId !== req.userId) {
      return res.status(403).json({ message: 'Access denied. This order is not assigned to you.' });
    }
    
    // Check if order is in correct state
    if (order.status !== 'in_transit') {
      return res.status(400).json({ message: `Cannot upload POD. Order status is ${order.status}` });
    }
    
    let offloadingDocumentUrl = null;
    if (req.file) {
      offloadingDocumentUrl = `${req.protocol}://${req.get('host')}/uploads/offloading-docs/${req.file.filename}`;
    }
    
    await order.update({
      offloadingDocumentUrl,
      status: 'offloading'
    });
    
    res.json({
      message: 'Offloading document (POD) uploaded successfully. Waiting for admin approval.',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading offloading document', error: error.message });
  }
};

// Driver marks trip as complete
const completeTrip = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if driver is assigned to this order
    if (order.driverId !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if offloading has been approved
    if (!order.offloadingApproved) {
      return res.status(400).json({ message: 'Cannot complete trip. Offloading has not been approved yet.' });
    }
    
    await order.update({ status: 'delivered' });
    
    // Free up the truck
    if (order.truckId) {
      await Truck.update({ isAvailable: true }, { where: { id: order.truckId } });
    }
    
    res.json({
      message: 'Trip completed successfully! Order delivered.',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error completing trip', error: error.message });
  }
};

// Get driver's trip history
const getMyTripHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { 
        driverId: req.userId,
        status: 'delivered'
      },
      include: [
        { model: User, as: 'customer', attributes: ['username', 'companyName'] }
      ],
      order: [['updatedAt', 'DESC']]
    });
    
    res.json({ history: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trip history', error: error.message });
  }
};

module.exports = {
  getMyAssignedOrders,
  startLoading,
  uploadOffloadingDocument,
  completeTrip,
  getMyTripHistory
};