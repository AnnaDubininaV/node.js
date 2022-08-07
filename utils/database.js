const mongodb = require('mongodb');

const dbConfig = require('./databaseConfig');

const { CLUSTER_NAME, USER_NAME, PASSWORD } = dbConfig;

// extracting mongoDB client constructor
const MongoClient = mongodb.MongoClient;

const connectionUrl = `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_NAME}.aonfkqn.mongodb.net/shop?retryWrites=true&w=majority`;
let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(connectionUrl)
    .then((client) => {
      console.log('Connected!!!!!!!!');
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;
