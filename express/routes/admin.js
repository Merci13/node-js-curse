const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../utils/path');

const products = [];


router.get('/add-product',(req, res, next) => {
    console.log('in the middle ware');
    res.sendFile(path.join(rootDir,'views', 'add-product.html'))

});



router.post('/product', (res, req, next) =>{

        const body = req.body;
        console.log(body);

        products.push({
            title: req.body.title
        });


        res.redirect('/');

} );


exports.router = router;
exports.products = products;
