const db = require("../models");

const Order = db.Order;
const User = db.User;
const Truck = db.Truck;
const OrderLocation = db.OrderLocation;
const Expense = db.Expense;
const PDFDocument = require("pdfkit");

// Customer creates a new order
const createOrder = async (req, res) => {
  try {
    const { pickupLocation, deliveryLocation, goodsDescription, weight } =
      req.body;

    const order = await Order.create({
      customerId: req.userId,
      pickupLocation,
      deliveryLocation,
      goodsDescription,
      weight,
      status: "pending",
      approvalStatus: "pending",
    });

    res.status(201).json({
      message: "Order created successfully. Waiting for admin approval.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

// Get customer's own orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.userId },
      include: [
        {
          model: User,
          as: "driver",
          attributes: ["username", "email", "phone"],
        },
        {
          model: Truck,
          as: "truck",
          attributes: ["truckName", "licensePlate", "imageUrl"],
        },
        {
          model: OrderLocation,
          as: "locations",
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["username", "email", "phone", "companyName"],
        },
        {
          model: User,
          as: "driver",
          attributes: ["username", "email", "phone"],
        },
        {
          model: Truck,
          as: "truck",
        },
        {
          model: OrderLocation,
          as: "locations",
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role === "customer" && order.customerId !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// Admin approves order and assigns driver & truck
const approveOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, driverId, departureTime, forecastedArrival } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!driverId) {
      return res.status(400).json({ message: "Please select a driver" });
    }

    const driver = await User.findByPk(driverId);

    if (!driver || driver.role !== "driver") {
      return res.status(400).json({ message: "Invalid driver selected" });
    }

    if (!driver.isAvailable) {
      return res.status(400).json({
        message: "Driver is currently on another trip",
      });
    }

    const assignedTruck = await Truck.findOne({
      where: { assignedDriverId: driverId },
    });

    if (!assignedTruck) {
      return res.status(400).json({
        message: "This driver does not have an assigned truck",
      });
    }

    if (!assignedTruck.isAvailable) {
      return res.status(400).json({
        message: "The driver's assigned truck is currently on another trip",
      });
    }

    await driver.update({ isAvailable: false });
    await assignedTruck.update({ isAvailable: false });

    await order.update({
      price,
      driverId,
      truckId: assignedTruck.id,
      departureTime,
      forecastedArrival,
      approvalStatus: "approved",
      status: "approved",
    });

    res.json({
      message: "Order approved successfully",
      order,
      assignedTruck,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error approving order",
      error: error.message,
    });
  }
};

// Admin gets all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["username", "email", "phone", "companyName"],
        },
        {
          model: User,
          as: "driver",
          attributes: ["username", "email", "phone"],
        },
        {
          model: Truck,
          as: "truck",
        },
        {
          model: OrderLocation,
          as: "locations",
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Driver updates order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role === "driver" && order.driverId !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const validStatuses = ["in_transit", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await order.update({ status });

    if (status === "delivered" && order.truckId) {
      await Truck.update(
        { isAvailable: true },
        { where: { id: order.truckId } }
      );
    }

    res.json({
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};

// Track order publicly
const trackOrder = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const order = await Order.findByPk(trackingNumber, {
      attributes: [
        "id",
        "status",
        "pickupLocation",
        "deliveryLocation",
        "departureTime",
        "forecastedArrival",
        "updatedAt",
      ],
      include: [
        {
          model: Truck,
          as: "truck",
          attributes: ["truckName", "licensePlate", "capacity"],
        },
        {
          model: User,
          as: "driver",
          attributes: ["username", "email", "phone"],
        },
        {
          model: OrderLocation,
          as: "locations",
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ tracking: order });
  } catch (error) {
    res.status(500).json({
      message: "Error tracking order",
      error: error.message,
    });
  }
};
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: Order,
          as: "order",
          include: [
            { model: User, as: "customer", attributes: ["username", "email", "phone"] },
            { model: User, as: "driver", attributes: ["username", "email", "phone"] },
            { model: Truck, as: "truck" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
};

const addOrderExpenses = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      fuel,
      tollgate,
      maintenance,
      driverAllowance,
      loadingCost,
      offloadingCost,
      otherDescription,
      otherCost,
    } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const totalAmount =
      Number(fuel || 0) +
      Number(tollgate || 0) +
      Number(maintenance || 0) +
      Number(driverAllowance || 0) +
      Number(loadingCost || 0) +
      Number(offloadingCost || 0) +
      Number(otherCost || 0);

    const expense = await Expense.create({
      orderId: id,
      fuel: fuel || 0,
      tollgate: tollgate || 0,
      maintenance: maintenance || 0,
      driverAllowance: driverAllowance || 0,
      loadingCost: loadingCost || 0,
      offloadingCost: offloadingCost || 0,
      otherDescription,
      otherCost: otherCost || 0,
      totalAmount,
    });

    res.status(201).json({
      message: "Expenses added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding expenses", error: error.message });
  }
};

const downloadOrderExpensesPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const expenses = await Expense.findAll({
      where: { orderId: id },
      include: [
        {
          model: Order,
          as: "order",
          include: [
            { model: User, as: "customer", attributes: ["username", "email", "phone"] },
            { model: User, as: "driver", attributes: ["username", "email", "phone"] },
            { model: Truck, as: "truck" },
          ],
        },
      ],
    });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found for this order" });
    }

    const order = expenses[0].order;
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=order_${id}_expenses.pdf`);

    doc.pipe(res);

    doc.fontSize(22).text("Order Expenses Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Order: #${order.id}`);
    doc.text(`Customer: ${order.customer?.username || "N/A"}`);
    doc.text(`Driver: ${order.driver?.username || "N/A"}`);
    doc.text(`Truck: ${order.truck?.truckName || "N/A"}`);
    doc.text(`Route: ${order.pickupLocation || "N/A"} to ${order.deliveryLocation || "N/A"}`);
    doc.moveDown();

    let grandTotal = 0;

    expenses.forEach((expense, index) => {
      grandTotal += Number(expense.totalAmount || 0);

      doc.fontSize(14).text(`Expense Entry ${index + 1}`, { underline: true });
      doc.fontSize(11).text(`Fuel: $${expense.fuel || 0}`);
      doc.text(`Tollgate: $${expense.tollgate || 0}`);
      doc.text(`Maintenance: $${expense.maintenance || 0}`);
      doc.text(`Driver Allowance: $${expense.driverAllowance || 0}`);
      doc.text(`Loading Cost: $${expense.loadingCost || 0}`);
      doc.text(`Offloading Cost: $${expense.offloadingCost || 0}`);
      doc.text(`Other: ${expense.otherDescription || "N/A"} - $${expense.otherCost || 0}`);
      doc.text(`Total: $${Number(expense.totalAmount || 0).toFixed(2)}`);
      doc.moveDown();
    });

    doc.fontSize(16).text(`Grand Total: $${grandTotal.toFixed(2)}`, { align: "right" });
    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating PDF", error: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  approveOrder,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
  getExpenses,
  addOrderExpenses,
  downloadOrderExpensesPDF,
};