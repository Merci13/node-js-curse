const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../utils/path');


router.get('/add-product',(req, res, next) => {
    console.log('in the middle ware');
    res.sendFile(path.join(rootDir,'views', 'add-product.html'))

});



router.post('/product', (res, req, next) =>{

        const body = req.body;

        res.redirect('/');

} );


module.exports = router;