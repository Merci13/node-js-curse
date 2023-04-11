const path = require('path');

const express = require('express');

 const router = express.Router();

// const adminData = require('./admin');

const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);


router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductById); //the ":" tell to express.js that before that there is not a path 

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/checkout',shopController.getCheckout);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);



module.exports = router;