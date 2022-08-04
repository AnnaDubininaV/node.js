const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const cartPath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // analise the cart => find existed product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = ++updatedProduct.qty;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + Number(productPrice);
      fs.writeFile(cartPath, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);

      if (!product) {
        return;
      }

      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;
      fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) =>
        console.log(err)
      );
    });
  }

  static getCart(cb) {
    fs.readFile(cartPath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        return cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
