const Product = require("../models/product");


exports.getProducts =  (req, res, next) => {

    // console.log(adminData.products);
    //this route ('/') need to be the last one to be check,
    // becouse, express will check every rout that start with '/'
    // res.sendFile(path.join( //join helps to create a path 
    //     __dirname, //__dirname is important because holds the absoluty paht of our system and this project
    //      '../', //telling him to go up one level
    //      'views', //view folder
    //      'shop.html')); //final file
    //      /**
    //       * Note: is important to do this in sections, becouse path package will make the path for windows, linux and mac System Operative
    //       */
 
    /**
     * This method is to use especial render to call the templates that we said to node that we were usign for 
     * displaying html pages.
     * We don't need to pase the path constructor because we alredy define where they will be.
     * Also we don't need to especificate the extension of the file, becouse we tell before to node.js that
     * we were using pug files
     */
    const products = Product.fetchAll((products)=>{
        res.render('shop/product-list',
        {
           prod: products,
           pageTitle: 'All Products',
           path: '/products',
           activeShop: true,

        });
    });
 
  
 
 };


 exports.getIndex = (req, res, nex) =>{

    const products = Product.fetchAll((products)=>{
        res.render('shop/index',
        {
           prod: products,
           pageTitle: 'Shop',
           path: '/index',
           activeShop: true,
  
        });
    });
 

 };

 exports.getCart = (req,res, next) =>{

    res.render('shop/cart', {
        path: '/cart',
        title: "Your Cart"
    });
 }

 exports.getCheckout = (req, res, next) =>{

    res.render('shop/checkout', {
       title: "Checkout",
       path: '/checkout' 
    });

 }