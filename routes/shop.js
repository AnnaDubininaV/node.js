const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  // this approach goes for sending an HTML page from server
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  // this approach goes for sending an pag/handlebars tamplate converted in HTML page from server
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    // use this options only in Hbs engine
    activeShop: true,
    productCSS: true,
    hasProducts: products.length > 0,
  });
});

module.exports = router;
