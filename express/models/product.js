
// //--We don't need this any more because we will use database
// // const fs = require('fs');
// // const path = require('path');

// // const p = path.join(
// //     path.dirname(require.main.filename),
// //     'data',
// //     'products.json'
// // );
// //-------------------------------------------------------------------------------------//



// const database = require('../utils/database');
// const Cart = require('./cart');

// //--We don't need this any more because we will use database
// // const getProductsFromFile = callBack => {


// //     fs.readFile(p, (err, fileContent) => {
// //         if (err) {
// //             return callBack([]);
// //         }
// //         callBack(JSON.parse(fileContent));
// //     });
// // }
// //-------------------------------------------------------------------------------------//



// module.exports = class Product {

//     constructor(id, title, imageUrl, description, price) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//         this.id = id;
//     }



//     save() {
//         // products.push(this); //'this' words make reference of the variable in the constructor method


//         //--We don't need this any more because we will use database
//         // getProductsFromFile(products => {
//         //     //check if the id already exist
//         //     if (this.id) {
//         //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//         //         const updatedProducts = [...products];
//         //         updatedProducts[existingProductIndex] = this;
//         //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         //             console.log(err);
//         //         });
//         //     } else {
//         //         this.id = Math.random().toString();
//         //         products.push(this);

//         //         fs.writeFile(p, JSON.stringify(products), (err) => {
//         //             console.log(err, 'Error in "save" method in product.js. <<<<<---------------------------');
//         //         });
//         //     }

//         // });

//         //-------------------------------------------------------------------------------------//

//        return database.execute('INSERT INTO products(title, price, description,imageUrl) VALUES(?,?,?,?)',
//         [this.title, this.price, this.description, this.imageUrl]);


//     }

//     static deleteById(id) {

//         //--We don't need this any more because we will use database
//         // getProductsFromFile(products => {

//         //     const product = products.find(prod => prod.id === id);
//         //     const updateProducts = products.filter(prod => prod.id !== id);
//         //     fs.writeFile(p, JSON.stringify(updateProducts), err => {
//         //         if (!err) {
//         //             Cart.deleteProduct(id, product.price);
//         //         }
//         //     });


//         // });
//         //-------------------------------------------------------------------------------------//


//     }

//     static fetchAll(
//         //callBack
//         ) {
//         //--We don't need this any more because we will use database
//         //  getProductsFromFile(callBack);
//         //-------------------------------------------------------------------------------------//

//       return  database.execute('SELECT * FROM products');

//     }


//     static findById(
//         id,
//          //callBack
//          ) {
//         //--We don't need this any more because we will use database
//         // getProductsFromFile(products => {
//         //     const product = products.find(p => p.id === id);
//         //     callBack(product);
//         // });
//         //-------------------------------------------------------------------------------------//

//         return database.execute('SELECT * FROM products WHERE products.id = ?', [id]);

//     }

// }


//-------------------------Using Sequelize---------------------------//

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');



// const Product = sequelize.define(
//     'product',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//         },
//         title: {
//             type: Sequelize.STRING
//         },
//         price: {
//             type: Sequelize.DOUBLE,
//             allowNull: false,

//         },
//         imageUrl: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         description: {
//             type: Sequelize.STRING,
//             allowNull: false,

//         }
//     }
// )

// module.exports = Product;


//--------------------------Using MongoDB------------------------//

const getDb = require('../utils/database').getDb;

class Product {

    constructor(title, price, description, imageUrl) {

        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;

    }

    save() {
        const db = getDb();

        return db.collection('products').insertOne(this)
            .then(result => {

                console.log(result);
            })
            .catch(err => {
                console.log('Error trying to Insert Product in product.js. Error: ', err, ' -------------->>>>');
            });
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log('Error trying to FetchAll Products in product.js. Error: ', err, ' -------------->>>>')
            });
    }

}
module.exports = Product;