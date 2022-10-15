const express = require('express');
const router = express.Router();



router.get('/add-product',(req, res, next) => {
    console.log('in the middle ware');
    res.send('<form action="/product" method="POST"> <input type="text" name="title" > </input><button type ="submit" >Add Product</button></form>');
});



router.post('/product', (res, req, next) =>{

        const body = req.body;

        res.redirect('/');

} );


module.exports = router;