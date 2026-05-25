'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      });
    }
  }

  Expense.init(
    {
      orderId: DataTypes.INTEGER,
      fuel: DataTypes.FLOAT,
      tollgate: DataTypes.FLOAT,
      maintenance: DataTypes.FLOAT,
      driverAllowance: DataTypes.FLOAT,
      loadingCost: DataTypes.FLOAT,
      offloadingCost: DataTypes.FLOAT,
      otherDescription: DataTypes.TEXT,
      otherCost: DataTypes.FLOAT,
      totalAmount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Expense',
    }
  );

  return Expense;
};