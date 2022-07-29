const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // relative path to /views fofled
  res.render('admin/add-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    // use this options only in Hbs engine
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};
