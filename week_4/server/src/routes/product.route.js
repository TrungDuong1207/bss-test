var express = require('express');
var ProductController = require('../controllers/product.controller.js');

var productRoutes = express.Router();

productRoutes.get("/", ProductController.getProducts);
productRoutes.get("/product-collection", ProductController.getProductsFromCollection);
productRoutes.get("/product-tag", ProductController.getProductsFromTag);

module.exports = productRoutes;
