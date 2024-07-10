const path = require('path');

const express = require('express');

const isAuth = require('../middleware/is-auth');


//const rootDir = require('../utils/path'); //for getting the root path for html views

const adminController = require('../controllers/admin');

const router = express.Router();




router.get(
    '/add-product',
    /**
     * just passing the reference for express to store and use when someone calls get function,
     * if I pass the productsController.getAddProduct with (), it won't work
     *                      |
     *                      V
     */
    isAuth,adminController.getAddProduct
);



router.get('/admin-products',isAuth, adminController.getProducts);

router.get('/edit-product/:productId',isAuth, adminController.getEditProduct);

router.post('/edit-product',isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth,adminController.postDeleteProduct);

router.post('/add-product',isAuth, adminController.postAddProduct);

module.exports = router;

