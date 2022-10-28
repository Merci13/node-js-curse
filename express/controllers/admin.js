

const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir,'views', 'add-product.html'))//for routing with html 
    res.render(
        'admin/add-product',
        {
            pageTitle: 'Add Product',
            path: '/add-product',
            activeProduct: true,
            formsCSS: true,
            productCSS: true,
        });

};


exports.postAddProduct = (req, res, next) => {


    //products.push({ title: req.body.title });

    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');

};

exports.getProducts = (req, res, nex) =>{

    const products = Product.fetchAll((products)=>{
        res.render('admin/products',
        {
           prod: products,
           pageTitle: 'Admin Product',
           path: '/admin-products',
           activeShop: true,
  
        });
    });
 

 };
 