const mysql = require('mysql2');

const dbConfig = require('./databaseConfig');

const { HOST, USER, DB_NAME, PASSWORD } = dbConfig;

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  database: DB_NAME,
  password: PASSWORD,
});

module.exports = pool.promise();
