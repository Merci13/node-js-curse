

const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir,'views', 'add-product.html'))//for routing with html 
    res.render(
        'admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/add-product',
            editing: false
          
        });

};


exports.postAddProduct = (req, res, next) => {


    //products.push({ title: req.body.title });

    const title = req.body.title.trim();
    const image = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description.trim();


    const product = new Product(null,title, image, description, price);
    product.save()
    .then(()=>{
        res.redirect('/');
    }).catch(err => {
        console.log(err, "--------------->>>>>>>>>")
    });

  

};

exports.getEditProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir,'views', 'add-product.html'))//for routing with html 

    //checkin for optionals queryparameters 
    // always the extract value will be a string value, soo, this value req.query.edit, will return "false" or "true" insted of 
    // false or true

    const editMode = req.query.edit;

    if(!editMode){
       return res.redirect('/');
    }
    //fetch the product by id
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if(!product){
         return   res.redirect('/');
        }
        res.render(
            'admin/edit-product',
            {
    
                pageTitle: 'Edit Product',
                path: '/edit-product',
                editing: editMode,
                product: product
    
              
            });
    });


   

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

 exports.postEditProduct= (req, res, next) =>{

    const productId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const updateImageUrl = req.body.imageUrl;

    const updateProduct = new Product(productId,updateTitle, updateImageUrl, updateDescription, updatePrice);
    updateProduct.save();

    res.redirect('/products');


 };

 exports.postDeleteProduct = (req, res, next) =>{
    const prodId = req.body.prodId;
    Product.deleteById(prodId);
    res.redirect('/products');

 } 