const { getDB } = require('../utils/database');
const mongoDB = require('mongodb');
class User {
  constructor(userName, email) {
    this.name = userName;
    this.email = email;
  }

  save() {
    const db = getDB();
    return db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection('users')
      .findOne({ _id: new mongoDB.ObjectId(userId) });
  }
}
module.exports = User;
