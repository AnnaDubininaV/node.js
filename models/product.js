const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongoDB.ObjectId(id);
  }

  save() {
    const db = getDB();

    if (this._id) {
      return db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    }

    return db.collection('products').insertOne(this);
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('products').find().toArray();
  }

  static findById(productId) {
    const db = getDB();
    return db
      .collection('products')
      .find({ _id: new mongoDB.ObjectId(productId) })
      .next();
  }
}

module.exports = Product;
