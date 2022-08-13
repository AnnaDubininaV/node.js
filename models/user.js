const { getDB } = require('../utils/database');
const mongoDB = require('mongodb');
class User {
  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection('users').insertOne(this);
  }

  addToCart(productId) {
    // const cartProduct = this.cart.items.findIndex(
    //   (item) => item._id === productId._id
    // );

    const updatedCart = { items: [{ ...productId, quantity: 1 }] };
    const db = getDB();
    return db
      .collection('users')
      .updateOne(
        { _id: new mongoDB.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection('users')
      .findOne({ _id: new mongoDB.ObjectId(userId) });
  }
}
module.exports = User;
