const mongodb = require('mongodb');

const dbConfig = require('./databaseConfig');

const { CLUSTER_NAME, USER_NAME, PASSWORD } = dbConfig;

// extracting mongoDB client constructor
const MongoClient = mongodb.MongoClient;
const connectionUrl = `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_NAME}.aonfkqn.mongodb.net/?retryWrites=true&w=majority`;

const mongoConnect = (cb) => {
  MongoClient.connect(connectionUrl)
    .then((client) => {
      console.log('Connected!!!!!!!!');
      cb(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
