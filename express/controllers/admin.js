

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

    const title = req.body.title;
    const image = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;


    const product = new Product(title, image, description, price);
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
 