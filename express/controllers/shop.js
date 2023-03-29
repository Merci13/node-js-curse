const Product = require("../models/product");
const Cart = require("../models/cart");


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

   Product.findAll().then(products => {
      console.log("Products: ---------------------------_>>>>", products);

      res.render('shop/product-list',
         {
            prod: products,
            pageTitle: 'All Products',
            path: '/products',
            activeShop: true,

         });

   }).catch(err => console.log(err, "Error Fetchin All --------->>>>>"));


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

   Product.findByPk(productId).then(
      product => {
         res.render('shop/product-detail',
            {
               product: product,
               pageTitle: product.title,
               path: `product/${product.id}`
            })
      }
   ).catch(err => console.log("Error find By PK : ", err, "-------------->>>>>>>"))


   //-----------Second manner to perform find--------//

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

   Product.findAll().then(products => {
      console.log("Products: ---------------------------_>>>>", products);

      res.render('shop/index',
         {
            prod: products,
            pageTitle: 'Shop',
            path: '/',
            activeShop: true,

         });

   }).catch(err => console.log(err, "Error Fetchin All --------->>>>>"));



};

exports.getCart = (req, res, next) => {

   Cart.getCart(cart => {

      Product.fetchAll(products => {
         const cartProducts = [];
         for (productInProducts of products) {

            const cartProductData = cart.products.find(prod => prod.id === productInProducts.id);

            if (cartProductData) {
               cartProducts.push({ productData: productInProducts, qty: cartProductData.qty });


            }
         }

         res.render('shop/cart', {
            path: '/cart',
            title: "Your Cart",
            pageTitle: "Cart",
            products: cartProducts
         });
      }
      );

      

   });


}

exports.postCart = (req, res, next) => {
   const productId = req.body.productId;

   //add the product to the cart
   Product.findById(productId, (product) => {
      Cart.addProduct(productId, product.price);

      //get cart and passed to the view
      Cart.getCart(cart => {
         Product.fetchAll(products => {
            const cartProducts = [];
            for (productInProducts of products) {

               const cartProductData = cart.products.find(prod => prod.id === productInProducts.id);
               console.log(cartProductData)

               if (cartProductData) {
                  cartProducts.push({ productData: productInProducts, qty: cartProductData.qty });
               }
            }

            res.render('shop/cart', {
               path: '/cart',
               title: "Your Cart",
               pageTitle: "Cart",
               products: cartProducts
            });
         }
         );

      });
   });


};

exports.postCartDeleteProduct = (req, res, next) => {

   const productId = req.body.productId;

   Product.findById(productId, product => {

      Cart.deleteProduct(productId, product.price);
      res.redirect('/cart');
   });
}

exports.getCheckout = (req, res, next) => {

   res.render('shop/checkout', {
      title: "Checkout",
      path: '/checkout',
      pageTitle: "ChekOut"
   });

}

exports.getOrders = (req, res, next) => {

   res.render('shop/orders', {
      title: "Orders",
      path: '/orders',
      pageTitle: 'Orders'
   });
}