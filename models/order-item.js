const Sequelize = require('sequelize');

const sequelise = require('../utils/database');

const OrderItem = sequelise.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
