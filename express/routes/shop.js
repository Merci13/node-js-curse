const path = require('path');

const express = require('express');

 const router = express.Router();
 
 const isAuth = require('../middleware/is-auth');

// const adminData = require('./admin');

const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);


router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductById); //the ":" tell to express.js that before that there is not a path 

 router.get('/cart',isAuth, shopController.getCart);

 router.post('/cart',isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth,shopController.postCartDeleteProduct);

router.get('/orders', isAuth,shopController.getOrders);

router.get('/checkout', isAuth, shopController.getCheckout);

router.get('/checkout/success', isAuth, shopController.getCheckoutSuccess );

router.get('/checkout/cancel', shopController.getCheckout);

// router.post('/create-order', isAuth,shopController.postOrder); //using paymenth third package we don't need this rout

router.get('/orders/:orderId', isAuth, shopController.getInvoice);



module.exports = router;