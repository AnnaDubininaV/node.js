const Sequelize = require('sequelize');

const sequelise = require('../utils/database');

const CartItem = sequelise.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
