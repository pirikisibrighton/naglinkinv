'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order belongs to Customer
      Order.belongsTo(models.User, { foreignKey: 'customerId', as: 'customer' });
      
      // Order belongs to Driver
      Order.belongsTo(models.User, { foreignKey: 'driverId', as: 'driver' });
      
      // Order belongs to Truck
      Order.belongsTo(models.Truck, { foreignKey: 'truckId', as: 'truck' });

      // Add this line inside the associate function
      Order.hasMany(models.OrderTruck, { foreignKey: 'orderId', as: 'trucks' });
      
      // Order has one Quote
      Order.hasOne(models.Quote, { foreignKey: 'orderId', as: 'quote' });
      
      // Order has one Invoice
      Order.hasOne(models.Invoice, { foreignKey: 'orderId', as: 'invoice' });
    }
  }
  
  Order.init({
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    truckId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pickupLocation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    deliveryLocation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    goodsDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    packageNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'loading', 'in_transit', 'offloading', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    forecastedArrival: {
      type: DataTypes.DATE,
      allowNull: true
    },
    approvalStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    loadingDocumentUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    offloadingDocumentUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    loadingApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    offloadingApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    loadingNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  
  return Order;
};