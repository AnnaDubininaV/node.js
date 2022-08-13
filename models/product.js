const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id && new mongoDB.ObjectId(id);
    this.userId = userId;
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

  static deleteById(productId) {
    const db = getDB();
    return db
      .collection('products')
      .deleteOne({
        _id: new mongoDB.ObjectId(productId),
      })
      .then((result) => {
        return db.collection('users').updateMany(
          {},
          {
            $pull: {
              'cart.items': { productId: new mongoDB.ObjectId(productId) },
            },
          }
        );
      });
  }
}

module.exports = Product;
