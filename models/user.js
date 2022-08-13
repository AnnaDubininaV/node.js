const { getDB } = require('../utils/database');
const mongoDB = require('mongodb');
class User {
  defaultCart = { items: [] };

  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart || this.defaultCart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection('users').insertOne(this);
  }

  addToCart(productId) {
    const cartProductIndex = this.cart.items.findIndex(
      (cartItem) => cartItem.productId.toString() === productId.toString()
    );

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex > -1) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId, quantity: newQuantity });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

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
