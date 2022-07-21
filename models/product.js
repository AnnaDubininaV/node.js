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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
