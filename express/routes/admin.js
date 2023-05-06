const path = require('path');

const express = require('express');


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
    adminController.getAddProduct
);



router.get('/admin-products', adminController.getProducts);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;

