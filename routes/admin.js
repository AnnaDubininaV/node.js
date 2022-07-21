const express = require('express');
const path = require('path');

const productsController = require('../controllers/products');
const router = express.Router();

// /admin/add-product = > GET
router.get('/add-product', productsController.getAddProdact);

router.post('/add-product', productsController.postAddProduct);

// module.exports = router;
module.exports = router;
