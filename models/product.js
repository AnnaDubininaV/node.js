const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const productsPath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      let updatedProducts;
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }

      fs.writeFile(
        productsPath,
        JSON.stringify(updatedProducts || products),
        (err) => {
          console.log(err);
        }
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => id === prod.id);
      cb(product);
    });
  }
};
