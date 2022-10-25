const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const router = express.Router();

const products = [];


router.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(rootDir,'views', 'add-product.html'))//for routing with html 
    res.render(
        'add-product.pug',
        {
            pageTitle: 'Add Product',
            path: '/add-product',
            activeProduct: true,
            formsCSS: true,
            productCSS: true,
            
            
        });

});

router.post('/add-product', (req, res, next) => {


    products.push({ title: req.body.title });

    res.redirect('/');

});


exports.router = router;
exports.products = products;
