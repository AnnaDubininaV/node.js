const Sequelize = require('sequelize');

const sequelise = require('../utils/database');

const Order = sequelise.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
