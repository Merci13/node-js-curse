
//--We don't need this any more because we will use database
// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//     path.dirname(require.main.filename),
//     'data',
//     'products.json'
// );
//-------------------------------------------------------------------------------------//



const database = require('../utils/database');
const Cart = require('./cart');

//--We don't need this any more because we will use database
// const getProductsFromFile = callBack => {


//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             return callBack([]);
//         }
//         callBack(JSON.parse(fileContent));
//     });
// }
//-------------------------------------------------------------------------------------//



module.exports = class Product {

    constructor(id, title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id;
    }



    save() {
        // products.push(this); //'this' words make reference of the variable in the constructor method


        //--We don't need this any more because we will use database
        // getProductsFromFile(products => {
        //     //check if the id already exist
        //     if (this.id) {
        //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        //         const updatedProducts = [...products];
        //         updatedProducts[existingProductIndex] = this;
        //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        //             console.log(err);
        //         });
        //     } else {
        //         this.id = Math.random().toString();
        //         products.push(this);

        //         fs.writeFile(p, JSON.stringify(products), (err) => {
        //             console.log(err, 'Error in "save" method in product.js. <<<<<---------------------------');
        //         });
        //     }

        // });

        //-------------------------------------------------------------------------------------//



    }

    static deleteById(id) {

        //--We don't need this any more because we will use database
        // getProductsFromFile(products => {

        //     const product = products.find(prod => prod.id === id);
        //     const updateProducts = products.filter(prod => prod.id !== id);
        //     fs.writeFile(p, JSON.stringify(updateProducts), err => {
        //         if (!err) {
        //             Cart.deleteProduct(id, product.price);
        //         }
        //     });


        // });
        //-------------------------------------------------------------------------------------//


    }

    static fetchAll(
        //callBack
        ) {
        //--We don't need this any more because we will use database
        //  getProductsFromFile(callBack);
        //-------------------------------------------------------------------------------------//

      return  database.execute('SELECT * FROM products');

    }


    static findById(
        id,
         //callBack
         ) {
        //--We don't need this any more because we will use database
        // getProductsFromFile(products => {
        //     const product = products.find(p => p.id === id);
        //     callBack(product);
        // });
        //-------------------------------------------------------------------------------------//
    }

}