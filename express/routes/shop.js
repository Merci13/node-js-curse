const express = require('express');
const path = require('path');

const router = express.Router();

const adminData =  require('./admin');


router.get('/',(req, res, next) => { 

    console.log(adminData.products);
    //this route ('/') need to be the last one to be check,
    // becouse, express will check every rout that start with '/'
    res.sendFile(path.join( //join helps to create a path 
        __dirname, //__dirname is important because holds the absoluty paht of our system and this project
         '../', //telling him to go up one level
         'views', //view folder
         'shop.html')); //final file
         /**
          * Note: is important to do this in sections, becouse path package will make the path for windows, linux and mac System Operative
          */
});



module.exports = router;