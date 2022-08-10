const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // relative path to /views fofled
  res.render('admin/edit-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    editing: false,
    // use this options only in Hbs engine
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      console.log('Created a Product');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } })
//     // Product.findByPk(prodId)
//     .then((products) => {
//       const product = products[0];
//       // TODO: show an error instead
//       if (!product) {
//         return res.redirect('/');
//       }

//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Products',
//         path: '/admin/add-product',
//         editing: true,
//         product,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditProduct = async (req, res, next) => {
//   const {
//     productId,
//     title: updatedTitle,
//     price: updatedPrice,
//     imageUrl: updatedImageUrl,
//     description: updatedDescription,
//   } = req.body;

//   try {
//     await Product.update(
//       {
//         title: updatedTitle,
//         price: updatedPrice,
//         imageUrl: updatedImageUrl,
//         description: updatedDescription,
//       },
//       {
//         where: { id: productId },
//       }
//     );

//     res.redirect('/admin/products');
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.params.productId;
//   Product.destroy({ where: { id: productId } })
//     .then(() => {
//       res.redirect('/admin/products');
//     })
//     .catch((err) => console.log(err));

//   // Product.findByPk(productId)
//   //   .then((product) => product.destroy())
//   //   .then(() => {
//   //     console.log('DESTROYED PRODUCT');
//   //     res.redirect('/admin/products');
//   //   })
//   //   .catch((err) => console.log(err));
// };

exports.getProducts = async (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};
