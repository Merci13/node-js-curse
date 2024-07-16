


const Product = require("../models/product");

const { validationResult } = require('express-validator/check');
const fileHelper = require("../utils/file");

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir,'views', 'add-product.html'))//for routing with html 

    res.render(
        'admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/add-product',
            editing: false,
            hasError: false,
            errorMessage: null,
            validationErrors: []

        });

};


exports.postAddProduct = (req, res, next) => {


    //products.push({ title: req.body.title });

    const title = req.body.title.trim();
    const image = req.file;
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
    // const product = new Product(
    //     title,
    //     price,
    //     description,
    //     image,
    //     null, 
    //     req.user._id
    // );
    //------------Mongoose----------------------------//

if(!image){
    return res.status(422).render(
        'admin/add-product',
        {
            pageTitle: 'Add Product',
            path: '/add-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                price: price,
                description: description,

            },

            errorMessage: "Attached file is not an image.",
            validationErrors: []


        });
}

    const errors = validationResult(req);
    const imageUrl = image.path;

    if (!errors.isEmpty()) {
        return res.status(422).render(
            'admin/add-product',
            {
                pageTitle: 'Add Product',
                path: '/add-product',
                editing: false,
                hasError: true,
                product: {
                    title: title,
                    price: price,
                    description: description,

                },

                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()


            });
    }

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        // userId: req.user //moogose will extract the user id
        userId: req.user
    });


    product
        .save()
        .then(result => {
            console.log("Created product ID:", result);
            res.redirect("admin-products");
        })
        .catch(err => {
            console.log('Error in admin.js in controller. Error: ', err, '------------->>');
            // return res.status(500).render(
            //     'admin/add-product',
            //     {
            //         pageTitle: 'Add Product',
            //         path: '/add-product',
            //         editing: false,
            //         hasError: true,
            //         product: {
            //             title: title,
            //             imageUrl: imageUrl,
            //             price: price,
            //             description: description,
    
            //         },
    
            //         errorMessage: "Database opration failed, please try again",
            //         validationErrors: []
    
    
            //     });
            // res.redirect('/500');
            // throw new Error(err);
            const error = new Error(err);
            error.httpstatus(500);
            return next(error);
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

    // Product.findById(productId)
    //     .then(product => {


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
    //     })
    //     .catch(err => {
    //         console.log("Error in admin.js in getEditProduct Method. Error: ", err, " --------------------->>");
    //     })
    //----------Mongoose -------------------//

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
                    product: product,
                    hasError: false,
                    errorMessage: null,
                    validationErrors: []


                });
        })
        .catch(err => {
            console.log("Error in admin.js in getEditProduct Method. Error: ", err, " --------------------->>");
            const error = new Error(err);
            error.httpstatus(500);
            return next(error);
        });



};

exports.postEditProduct = (req, res, next) => {

    const productId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const updateImage = req.file;

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
    // const product = new Product(
    //     updateTitle,
    //     updatePrice,
    //     updateDescription,
    //     updateImageUrl,
    //     productId
    // );

    // product.save()
    //     .then(result => {
    //         //  console.log("Updated Product, Id: ", result._id);
    //         res.redirect('/products');
    //     })
    //     .catch(err => {
    //         console.log("Error in admin.js in postEditProduct Method. Error: ", err, " ---------------->>>>>>>");
    //     })
    //------------Mongoose----------------------//
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(422).render(
            'admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: '/edit-product',
                editing: true,
                hasError: true,
                product: {
                    title: updateTitle,
                    price: updatePrice,
                    description: updateDescription,
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array(),
                _id: prodId
            });
    }


    Product.findById(productId).then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/');
        }
        product.title = updateTitle;
        product.price = updatePrice;
        product.description = updateDescription;
        if(image){
            fileHelper.deleteFile(product.imageUrl);
            product.imageUrl = updateImage.path;
        }

        return product.save().then(result => {
            //  console.log("Updated Product, Id: ", result._id);
            res.redirect('/products');
        });
    })
        .catch(err => {
            console.log("Error in admin.js in postEditProduct Method. Error: ", err, " ---------------->>>>>>>");
            const error = new Error(err);
            error.httpstatus(500);
            return next(error);
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

    //------------MongoDB----------------------//
    // Product.fetchAll()
    //     .then(products => {

    //         res.render('admin/products',
    //             {
    //                 prod: products,
    //                 pageTitle: 'Admin Product',
    //                 path: '/admin-products',
    //                 activeShop: true,

    //             });

    //     })
    //     .catch(err => {
    //         console.log("Error in admin.js in getProducts Method. Error: ", err, " ------------->>>>>");
    //     })


    //------------Mongoose---------------------//
    Product.find({ userId: req.user._id })
        //.select method allows to return only the data that we need, also, writing "-" in front of a data will remove from the data that we expect
        // .select(
        //     'title description -_id'
        // )
        //populate method allows to us to get all information from references 
        // .populate(
        //     'userId',
        // )
        .then(products => {

            res.render('admin/products',
                {
                    prod: products,
                    pageTitle: 'Admin Product',
                    path: '/admin-products',
                    activeShop: true,

                });

        })
        .catch(err => {
            console.log("Error in admin.js in getProducts Method. Error: ", err, " ------------->>>>>");
            const error = new Error(err);
            error.httpstatus(500);
            return next(error);
        })

};


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.deleteById(prodId);
    //-----Sequelize----//

    // Product.findByPk(prodId)
    //     .then(product => {
    //         console.log(product, ' ----------------->>>');
    //         return product.destroy();
    //     })
    //     .then(result => {
    //         console.log("Destroy: ", result, '------------->>>>')
    //         res.redirect('/products');
    //     })
    //     .catch(err => { 
    //         console.log("Error: ", err, " ---------->>>");
    //         res.redirect('/');

    //     });

    // -------------------MongoDB---------------//

    // Product.deleteById(prodId)
    // .then(result => {
    //     res.redirect('/products');
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    // -------------------Mongoose---------------//

    Product.findById(prodId)
    .then(product => {
        if(!product){
            return next(new Error('Product not found.'));
        }
        fileHelper.deleteFile(product.imageUrl);
       return Product.deleteOne({ _id: prodId, userId: req.user._id });
    }).then(result => {
        res.redirect('/products');
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpstatus(500);
        return next(error);
    })
    
        

} 