


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
      // const product = new Product(null,title, image, description, price);
    // product.save()
    // .then(()=>{
    //     res.redirect('/');
    // }).catch(err => {
    //     console.log(err, "--------------->>>>>>>>>")
    // });

    //----------------Sequelize-------------//

    // req.user.createProduct({
    //     title: title,
    //     imageUrl: image,
    //     price: price,
    //     description: description,
        
    // })
    // .then(result => {
    //     console.log("Created product ID:", result['dataValues']['id'], "---------------->>>>>");
    //     res.redirect("admin-products")
    // })
    // .catch(err => console.log(err, "--------------->>>>>"));

    //------------MongoDB----------------------------//
    const product = new Product(
        title,
        price,
        description, 
        image,
        );

        product.save()
        .then( result => {
            console.log("Created product ID:", result);
            res.redirect("admin-products");
        })
        .catch( err => {
            console.log('Error in admin.js in controller. Error: ', err, '------------->>');
        });



};

exports.getEditProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir,'views', 'add-product.html'))//for routing with html 

    //checkin for optionals queryparameters 
    // always the extract value will be a string value, soo, this value req.query.edit, will return "false" or "true" insted of 
    // false or true

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    //fetch the product by id
    const productId = req.params.productId;
    // Product.findById(productId, product => {
    //     if (!product) {
    //         return res.redirect('/');
    //     }
    //     res.render(
    //         'admin/edit-product',
    //         {

    //             pageTitle: 'Edit Product',
    //             path: '/edit-product',
    //             editing: editMode,
    //             product: product


    //         });
    // });

    //-------Sequelize---------//
    //Note: replace all ocurrences of .findById() to .findByPk();

//     req.user.getProducts({where: { id: productId}})

//    // Product.findByPk(productId)
    
//     .then(products => {

//         const product = products[0];

//         if (!product) {
//             return res.redirect('/');
//         }
//         res.render(
//             'admin/edit-product',
//             {
//                 pageTitle: 'Edit Product',
//                 path: '/edit-product',
//                 editing: editMode,
//                 product: product


//             });

//     }).catch(err => console.log('Error: ', err, "------------------->>>"));

//----------MongoDB -------------------//

    Product.findById(productId)
    .then(product => {


        if (!product) {
            return res.redirect('/');
        }
        res.render(
            'admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: '/edit-product',
                editing: editMode,
                product: product


            });
    })
    .catch(err => {
        console.log("Error in admin.js in getEditProduct Method. Error: ", err, " --------------------->>");
    })



};

exports.postEditProduct = (req, res, next) => {

    const productId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const updateImageUrl = req.body.imageUrl;

    // const updateProduct = new Product(productId, updateTitle, updateImageUrl, updateDescription, updatePrice);
    // updateProduct.save();

    //------Sequelize-----------//
    // Product.findByPk(productId).then(product => {

    //     product.title = updateTitle;
    //     product.price = updatePrice;
    //     product.imageUrl = updateImageUrl;
    //     product.description = updateDescription;
    //     return product.save();


    // }).then(result => {
    //     console.log("Updated Product, Id: ", result.id);
    //     res.redirect('/products');
    // }).catch(err => console.log("Error: ", err, " ------------>>>>"))


    //------------MongoDB----------------------//
    const product = new Product(
        updateTitle,
        updatePrice, 
        updateDescription, 
        updateImageUrl, 
        productId
    );

    product.save()
    .then(result =>{
      //  console.log("Updated Product, Id: ", result._id);
        res.redirect('/products');
    })
    .catch(err => {
        console.log("Error in admin.js in postEditProduct Method. Error: ", err, " ---------------->>>>>>>");
    })


};

exports.getProducts = (req, res, nex) => {

    // const products = Product.fetchAll((products)=>{
    //     res.render('admin/products',
    //     {
    //        prod: products,
    //        pageTitle: 'Admin Product',
    //        path: '/admin-products',
    //        activeShop: true,

    //     });
    // });

    //----------Sequelize----------//
    // req.user.getProducts()

    // // Product.findAll()
    // .then(products => {
    //     res.render('admin/products',
    //         {
    //             prod: products,
    //             pageTitle: 'Admin Product',
    //             path: '/admin-products',
    //             activeShop: true,

    //         });

    // }).catch(err => console.log('Error: ', err, "-------------------->>>>>>>>>>"));

    Product.fetchAll()
    .then(products => {
         
        res.render('admin/products',
            {
                prod: products,
                pageTitle: 'Admin Product',
                path: '/admin-products',
                activeShop: true,

            });

    })
    .catch(err =>{
        console.log("Error in admin.js in getProducts Method. Error: ", err, " ------------->>>>>");    
    })

};


// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     // Product.deleteById(prodId);
//     //-----Sequelize----//

//     Product.findByPk(prodId)
//         .then(product => {
//             console.log(product, ' ----------------->>>');
//             return product.destroy();
//         })
//         .then(result => {
//             console.log("Destroy: ", result, '------------->>>>')
//             res.redirect('/products');
//         })
//         .catch(err => { 
//             console.log("Error: ", err, " ---------->>>");
//             res.redirect('/');
        
//         });

// } 