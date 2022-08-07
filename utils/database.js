const { Sequelize } = require('sequelize');

const dbConfig = require('./databaseConfig');

const { HOST, USER, DB_NAME, PASSWORD } = dbConfig;

// this will set up a connection pool under the hood with a fully configured sequelize environment
const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  dialect: 'mysql',
  host: HOST,
});

module.exports = sequelize;
