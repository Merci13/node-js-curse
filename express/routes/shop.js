const express = require('express');

const router = express.Router();



router.get('/',(req, res, next) => { 
    //this route ('/') need to be the last one to be check,
    // becouse, express will check every rout that start with '/'
    console.log('in the middle ware');
    res.send('<h1>Hello from Express.js</>');
});


module.exports = router;