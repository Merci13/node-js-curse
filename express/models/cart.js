

// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//     path.dirname(require.main.filename),
//     'data',
//     'cart.json'
// );



// module.exports = class Cart {

//     // constructor(){

//     //         this.products = [];
//     //         this.totalPrice = 0;

//     // };

//     static addProduct(id, productPrice) {

//         let cart = { products: [], totalPrice: 0 };

//         //Fetch the previous cart

//             fs.readFile(p, (err, fileContent) => {

//             if (!err) {

//                 cart = JSON.parse(fileContent);
          

//             }
//              //Analyze the cart => Find existing product 
            
//         const existingProductIndex = cart.products.findIndex(prod => prod.id === id);

//         const existingProduct = cart.products[existingProductIndex];
     
//         let updateProduct;
          
//         //Add new product or increase quantity
//         if (existingProduct) {
        
//             updateProduct = { ...existingProduct };
//             updateProduct.qty = updateProduct.qty + 1;
        
//             cart.products = [...cart.products];
   
//             cart.products[existingProductIndex] = updateProduct;
//         } else {


//             updateProduct = {
//                 id: id,
//                 qty: 1,
//             };
//             cart.products = [...cart.products, updateProduct];
//         }

//         cart.totalPrice =  parseInt(cart.totalPrice) + parseInt(productPrice);



//         fs.writeFile(p, JSON.stringify(cart), (err) => {
//             if (err) {
//                 console.log(err, 'Error in "addProduct" method in cart.js. <<<<<<<---------------------------');
//             }

//         });
//         });
//     }


//     static deleteProduct(id, productPrice) {

//         fs.readFile(p, (err, fileContent) => {


//             if (err) {
//                 return;
//             }


//             const updateCart = { ...JSON.parse(fileContent) };


//             const product = updateCart.products.find(prod => prod.id === id);
//             if (!product) {
//                 return;
//             }

//             const productQty = product.qty;
//             updateCart.products = updateCart.products.filter(prod => prod.id !== id);




//             updateCart.cartTotalPrice = updateCart.totalPrice - (productPrice * productQty);


//             fs.writeFile(p, JSON.stringify(updateCart), err => {
//                 if (err) {
//                     console.log(err, 'Error in "deleteProduct" method in cart.js. <<<<<<<----------------------------------');
//                 }

//             });

//         });

//     }


//     static getCart(cb) {

//         fs.readFile(p, (err, fileContent) => {
//             const cart = JSON.parse(fileContent);
//             if (err) {
//                 cb(null);
//             } else {
//                 cb(cart);
//             }


//         });

//     }





// };


//---------Sequelize----------------------//


// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Cart = sequelize.define('cart', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false, 
//         primaryKey: true
//     }


// });

//module.exports = Cart;


//--------Mongo DB-----------//
