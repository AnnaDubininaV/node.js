// const { getDB } = require('../utils/database');
// const mongoDB = require('mongodb');
// class User {
//   defaultCart = { items: [] };

//   constructor(userName, email, cart, id) {
//     this.name = userName;
//     this.email = email;
//     this.cart = cart || { ...this.defaultCart }; // {items: []}
//     this._id = id;
//   }

//   save() {
//     const db = getDB();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(productId) {
//     const cartProductIndex = this.cart.items.findIndex(
//       (cartItem) => cartItem.productId.toString() === productId.toString()
//     );

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex > -1) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({ productId, quantity: newQuantity });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };

//     const db = getDB();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongoDB.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDB();
//     const productIds = this.cart.items.map((cartItem) => cartItem.productId);

//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) =>
//         products.map((product) => ({
//           ...product,
//           quantity: this.cart.items.find(
//             (cartItem) =>
//               cartItem.productId.toString() === product._id.toString()
//           ).quantity,
//         }))
//       );
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       (cartItem) => cartItem.productId.toString() !== productId.toString()
//     );

//     const db = getDB();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongoDB.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDB();

//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: { _id: new mongoDB.ObjectId(this._id), name: this.name },
//         };

//         return db.collection('orders').insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { ...this.defaultCart };

//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new mongoDB.ObjectId(this._id) },
//             { $set: { cart: { ...this.defaultCart } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDB();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new mongoDB.ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDB();

//     return db
//       .collection('users')
//       .findOne({ _id: new mongoDB.ObjectId(userId) });
//   }
// }
// module.exports = User;
