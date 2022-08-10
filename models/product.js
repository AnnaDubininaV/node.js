const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
    return db.collection('products').insertOne(this);
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((err) => console.log(err));
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
