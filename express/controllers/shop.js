const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");


exports.getProducts = (req, res, next) => {

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
   //    const products = Product.fetchAll().then(([rows, fetchData]) =>{
   //   res.render('shop/product-list',
   //          {
   //             prod: rows,
   //             pageTitle: 'All Products',
   //             path: '/products',
   //             activeShop: true,

   //          });


   //    }).catch((err => {

   //       console.log(err, "---------------------->>>>>")
   //    }));
   //----------------Sequelize-------------------//

   // Product.findAll().then(products => {
   //    console.log("Products: ---------------------------_>>>>", products);

   //    res.render('shop/product-list',
   //       {
   //          prod: products,
   //          pageTitle: 'All Products',
   //          path: '/products',
   //          activeShop: true,

   //       });

   // }).catch(err => console.log(err, "Error Fetchin All --------->>>>>"));

   //----------MongoDB-------------//
   // Product.fetchAll()
   //    .then(products => {
   //       res.render('shop/product-list',
   //          {
   //             prod: products,
   //             pageTitle: 'All Products',
   //             path: '/products',
   //             activeShop: true,
   //          }
   //       );
   //    })
   //    .catch(err => {
   //       console.log(err, "Error Fetchin All --------->>>>>")
   //    });
      //----------Mongoose-------------//
   Product.find()
   .then(products => {
      res.render('shop/product-list',
         {
            prod: products,
            pageTitle: 'All Products',
            path: '/products',
            activeShop: true,
            isAuthenticated: req.session.isLoggedIn
         }
      );
   })
   .catch(err => {
      console.log(err, "Error Fetchin All --------->>>>>")
   });


};

exports.getProductById = (req, res, next) => {
   const productId = req.params.productId;
   // Product.findById(productId)
   // .then(([product, fetchData])=>{
   //    res.render('shop/product-detail',
   //    {
   //       product: product[0],
   //       pageTitle: product.title,
   //       path: `product/${product.id}`
   //    })
   // })
   // .catch(err => console.log(err));

   //---------Sequelize-------------//

   // Product.findByPk(productId).then(
   //    product => {
   //       res.render('shop/product-detail',
   //          {
   //             product: product,
   //             pageTitle: product.title,
   //             path: `product/${product.id}`
   //          })
   //    }
   // ).catch(err => console.log("Error find By PK : ", err, "-------------->>>>>>>"))


   //-----------Second manner to perform find in Sequelize--------//

   // Product.findAll({ where: {
   //    id: productId
   // } }).then(products => {
   //    res.render('shop/product-detail',
   //    {
   //       product: products[0],
   //       pageTitle: products[0].title,
   //       path: `product/${products[0].id}`
   //    })

   //  }).catch(err => console.log(err, "------------->>>"));


   //---------------Mongo DB----------------//


   // Product.findById(productId)
   //    .then(product => {

   //       res.render('shop/product-detail',
   //          {
   //             product: product,
   //             pageTitle: product.title,
   //             path: `product/${product.id}`
   //          })

   //    })
   //    .catch(err => {
   //       console.log(err);
   //    })

   //---------------Mongoose----------------//


   Product.findById(productId) //this findById method is belongs to mongoose 
   .then(product => {

      res.render('shop/product-detail',
         {
            product: product,
            pageTitle: product.title,
            path: `product/${product.id}`,
            isAuthenticated: req.session.isLoggedIn
         })

   })
   .catch(err => {
      console.log(err);
   })

};



exports.getIndex = (req, res, nex) => {

   // const products = Product.fetchAll().then(
   //    ([rows, fieldData]) => {
   //       console.log(rows, "------------>>>>");
   //       res.render('shop/index',
   //          {
   //             prod: rows,
   //             pageTitle: 'Shop',
   //             path: '/',
   //             activeShop: true,

   //          });
   //    }).catch(err => {
   //       console.log(err, "------------>>>")
   //    });

   //--------Sequelize------------//

   // Product.findAll().then(products => {
   //    console.log("Products: ---------------------------_>>>>", products);

   //    res.render('shop/index',
   //       {
   //          prod: products,
   //          pageTitle: 'Shop',
   //          path: '/',
   //          activeShop: true,

   //       });

   // }).catch(err => console.log(err, "Error Fetchin All --------->>>>>"));

   //----------MongoDB-------------//
   // Product.fetchAll()
   //    .then(products => {
   //       res.render('shop/index',
   //          {
   //             prod: products,
   //             pageTitle: 'Shop',
   //             path: '/',
   //             activeShop: true,
   //          }
   //       );
   //    })
   //    .catch(err => {
   //       console.log(err, "Error Fetchin All in getIndex Method --------->>>>>")
   //    });
  //-------------Mongoose-----------------------//

  Product.find()
  .then(products => {
     res.render('shop/index',
        {
           prod: products,
           pageTitle: 'Shop',
           path: '/',
           activeShop: true,
           isAuthenticated: req.session.isLoggedIn
        }
     );
  })
  .catch(err => {
     console.log(err, "Error Fetchin All in getIndex Method --------->>>>>")
  });


};

exports.getCart = (req, res, next) => {

   // Cart.getCart(cart => {

   //    Product.fetchAll(products => {
   //       const cartProducts = [];
   //       for (productInProducts of products) {

   //          const cartProductData = cart.products.find(prod => prod.id === productInProducts.id);

   //          if (cartProductData) {
   //             cartProducts.push({ productData: productInProducts, qty: cartProductData.qty });


   //          }
   //       }

   //       res.render('shop/cart', {
   //          path: '/cart',
   //          title: "Your Cart",
   //          pageTitle: "Cart",
   //          products: cartProducts
   //       });
   //    }
   //    );



   // });


   //---------------Sequelize----------------//

   // req.user.getCart()
   //    .then(cart => {
   //       return cart.getProducts().then(products => {


   //          res.render('shop/cart', {
   //             path: '/cart',
   //             title: "Your Cart",
   //             pageTitle: "Cart",
   //             products: products
   //          });

   //       }).catch(err => {

   //          console.log("Error in Method getProducts, Error: ", err, "---------------->>>>");
   //       });
   //    })
   //    .catch(err => {

   //       console.log("Error in Method getCart, Error: ", err, "---------------->>>>");
   //    })
    // --------------Mongo DB --------------------//

   // req.user
   //    .getCart()
   //    .then(products => {
         

   //          res.render('shop/cart', {
   //             path: '/cart',
   //             title: "Your Cart",
   //             pageTitle: "Cart",
   //             products: products
   //          });

         

   //    }).catch(err => {
   //       console.log("Error in shop.js file in getCart method. Error: ", err, " ------------------>>>");
   //    })

   // --------------Mongoose--------------------//

   req.user
      .populate(
         'cart.items.productId'
      )
      
      .then(user => {
         const products = user.cart.items;
            res.render('shop/cart', {
               path: '/cart',
               title: "Your Cart",
               pageTitle: "Cart",
               products: products,
               isAuthenticated: req.session.isLoggedIn
            });

      }).catch(err => {
         console.log("Error in shop.js file in getCart method. Error: ", err, " ------------------>>>");
      })


}

exports.postCart = (req, res, next) => {
   const productId = req.body.productId;

   // //add the product to the cart
   // Product.findById(productId, (product) => {
   //    Cart.addProduct(productId, product.price);

   //    //get cart and passed to the view
   //    Cart.getCart(cart => {
   //       Product.fetchAll(products => {
   //          const cartProducts = [];
   //          for (productInProducts of products) {

   //             const cartProductData = cart.products.find(prod => prod.id === productInProducts.id);
   //             console.log(cartProductData)

   //             if (cartProductData) {
   //                cartProducts.push({ productData: productInProducts, qty: cartProductData.qty });
   //             }
   //          }

   //          res.render('shop/cart', {
   //             path: '/cart',
   //             title: "Your Cart",
   //             pageTitle: "Cart",
   //             products: cartProducts
   //          });
   //       }
   //       );

   //    });
   // });


   //-----------------Sequelize----------------//

   // let fetchedCart;

   // let newQuantity = 1;

   // req.user
   //    .getCart()
   //    .then(cart => {
   //       fetchedCart = cart;
   //       return cart.getProducts({ where: { id: productId } });
   //    })
   //    .then(products => {
   //       let product;
   //       if (products.length > 0) {

   //          product = products[0];
   //       }
   //       if (product) {

   //          const oldQuantity = product.cartItem.quantity;
   //          newQuantity = oldQuantity + 1;
   //          return product;

   //       }
   //       //adding to the cart as new product

   //       return Product.findByPk(productId)


   //    })
   //    .then(product => {
   //       return fetchedCart.addProduct(
   //          product, {
   //          through: {
   //             quantity: newQuantity
   //          }
   //       }
   //       );
   //    })
   //    .then(() => {

   //       //toDo here will crash beacouse we are expecting an array of products (cartProducts)

   //       // res.render('shop/cart', {
   //       //    path: '/cart',
   //       //    title: "Your Cart",
   //       //    pageTitle: "Cart",
   //       //    products: cartProducts
   //       // });

   //       res.redirect('/cart');
   //    })
   //    .catch(err => {

   //       console.log("Error in Method getCart, Error: ", err, "---------------->>>>");
   //    });

   //-----------------MongoDB--------------------------//

   // Product.findById(productId)
   //    .then(product => {
   //      return  req.user.addToCart(product);
          
   //    })
   //    .then(result => {
   //       console.log(result);
   //       res.redirect('/cart');
   //    })
   //    .catch(err => {
   //       console
   //          .log("Error in shop.js in Product.findById method in postCart Method. Error: ", err, " ----------------------->>>");
   //    })

         //-----------------Mongoose--------------------------//

   Product.findById(productId)
   .then(product => {
     return  req.sessions.user.addToCart(product);
       
   })
   .then(result => {
      console.log(result);
      res.redirect('/cart');
   })
   .catch(err => {
      console
         .log("Error in shop.js in Product.findById method in postCart Method. Error: ", err, " ----------------------->>>");
   })

};

exports.postCartDeleteProduct = (req, res, next) => {

   const productId = req.body.productId;

   // Product.findById(productId, product => {

   //    Cart.deleteProduct(productId, product.price);
   //    res.redirect('/cart');
   // });

   //--------------Sequelize-----------------//

   // req.user.getCart()
   //    .then(cart => {
   //       return cart.getProducts({ where: { id: productId } });
   //    })
   //    .then(products => {
   //       const product = products[0];

   //       return product.cartItem.destroy();

   //    })
   //    .then(result => {
   //       res.redirect('/cart');
   //    })
   //    .catch(err => {
   //       console.log("Error in Method getCart, Error: ", err, "---------------->>>>");
   //    })

   // ---------MongoDB ---------------//

   // req.user.deleteItemFromCart(productId)
   // .then( result => {
   //    res.redirect('/cart');
   // })
   // .catch(err =>{
   //    console.log("Error in deleteItemFromCart method in shop.js. Error: ", err, "------------->>>>>");
   // })

     // ---------Mongoose ---------------//

     req.user.removeFromCart(productId)
     .then( result => {
        res.redirect('/cart');
     })
     .catch(err =>{
        console.log("Error in deleteItemFromCart method in shop.js. Error: ", err, "------------->>>>>");
     })
}

exports.postOrder = (req, res, next) => {

   // let fetchedCart;

   // req.user.getCart()
   //    .then(cart => {
   //       fetchedCart = cart;
   //       return cart.getProducts();
   //    })
   //    .then(products => {
   //       return req.user.createOrder()
   //          .then(order => {
   //             return order.addProducts(products.map(product => {
   //                product.orderItem = { quantity: product.cartItem.quantity };

   //                return product;
   //             }));
   //          })
   //          .catch(err => {

   //             console.log("Error in Method createOrder, Error: ", err, "---------------->>>>");
   //          })
   //          ;
   //    })
   //    .then(result => {

   //       return fetchedCart.setProducts(null);

   //    })
   //    .then(result => {
   //       res.redirect('/orders');
   //    })
   //    .catch(err => {

   //       console.log("Error in Method getCart, Error: ", err, "---------------->>>>");
   //    })

   //-----------------MongoDB -----------------//

   // req.user.addOrder()

   //    .then(result => {
   //       console.log(result);
   //       res.redirect('/orders');
   //    })
   //    .catch(err => {

   //       console.log("Error in Method getCart, Error: ", err, "---------------->>>>");
   //    })

      //-----------------Mongoose -----------------//

req.user
.populate('cart.items.productId')
.then(user =>{
   const products = user.cart.items.map( i => {
      return {quantity: i.quantity, product: { ...i.productId._doc }};
   });
   const order = new Order({
      user: {
         name: req.user.name,
         userId: req.user
      },
      products: products
   });

   return order.save();

}).then(() => {

      return  req.user.clearCart();
      
   }).then(() => {
      res.redirect('/orders');
   })
   .catch(err => {

      console.log("Error in Method getCart, Error: ", err, "---------------->>>>");
   })

};

exports.getCheckout = (req, res, next) => {

   res.render('shop/checkout', {
      title: "Checkout",
      path: '/checkout',
      pageTitle: "ChekOut",
      isAuthenticated: req.session.isLoggedIn
   });

}

exports.getOrders = (req, res, next) => {
   //----Sequelize------//

   // req.user.getOrders({ include: ['products'] })
   //    .then(orders => {

   //       const order = orders[0];

   //       res.render('shop/orders', {
   //          title: "Orders",
   //          path: '/orders',
   //          pageTitle: 'Orders',
   //          orders: orders
   //       });

   //    })
   //    .catch(err => {

   //       console.log("Error in Method getOrders, Error: ", err, "---------------->>>>");
   //    });

   //----Mongo DB------//

   // req.user.getOrders()
   // .then( orders => {
   //    res.render('shop/orders', {
   //       title: "Orders",
   //       path: '/orders',
   //       pageTitle: 'Orders',
   //       orders: orders
   //    });
   // })
   // .catch(err => {
   //    console.log("Error in Method getOrders, Error: ", err, "---------------->>>>");
   // });
 //----Mongoose------//

 Order.find({"user.userId": req.user._id})
 .then( orders => {
    res.render('shop/orders', {
       title: "Orders",
       path: '/orders',
       pageTitle: 'Orders',
       orders: orders,
       isAuthenticated: req.session.isLoggedIn
    });
 })
 .catch(err => {
    console.log("Error in Method getOrders, Error: ", err, "---------------->>>>");
 });
}
