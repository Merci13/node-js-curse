


// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const User = sequelize.define(
//     'user', {
//         id:{
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true

//         },
//         name:{
//             type: Sequelize.STRING,
//             email: Sequelize.STRING,
//             allowNull: false
//         },


//     }
// );

// module.exports = User;

//--------------------MongoDB----------------//
// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;

// const ObjectId = mongodb.ObjectId;



// class User {

//     constructor(username, email, id, cart) {

//         this.username = username;
//         this.email = email;
//         this._id = id ? new ObjectId(id) : null;
//         this.cart = cart;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     static findingUserById(userId) {
//         const db = getDb();
//         return db.collection('users')
//             .findOne({ _id: new ObjectId(userId) })
//             .then(user => {
//                 console.log(user);
//                 return user;
//             })
//             .catch(err => {
//                 console.log("Error in user.js file in findingUserById Method. Error: ", err, " ----------------------->>>");
//             });
//     }

//     addToCart(product) {

//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();


//         });

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
//         }

//         const updatedCart = {
//             items: updatedCartItems
//         };

//         const db = getDb();
//         return db.collection('users')
//             .updateOne(
//                 { _id: this._id },
//                 { $set: { cart: updatedCart } }
//             );

//     }


//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(item => {
//             return item.productId;
//         })
//         return db.collection('products').find({ _id: { $in: productIds } })
//             .toArray()
//             .then(products => {
//                 return products.map(product => {
//                     return {
//                         ...product, quantity: this.cart.items.find(item => {
//                             return item.productId.toString() === product._id.toString();
//                         }).quantity
//                     };
//                 });
//             })
//             .catch(err => {

//             })
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         });
//         const db = getDb();
//         return db.collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 {
//                     $set: {
//                         cart: {
//                             items: updatedCartItems
//                         }
//                     }
//                 }

//             );

//     }

//     addOrder(){
//         const db = getDb();
//        return this.getCart().then(products => {

//             const order ={
//                 items: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.name,
//                     email: this.email
//                 }
//             };
//             return db.collection('orders')
//             .insertOne(order);
//         })
//         .then(result =>{
//             this.cart = {items: []}
//            return db.collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 {
//                     $set: {
//                         cart: {
//                             items: []
//                         }
//                     }
//                 }

//             );
//         })
//         .catch(err => {
//             console.log("Error in addOrder in users.js fiel. Error: ", err, "---------->>>>");
//         });
//     }

//     getOrders(){

//         const db = getDb();
//            return db.collection('orders')
//            .find({'user._id': new ObjectId(this._id)})
//            .toArray();
//     }



// }






// module.exports = User;


//--------------------------Using Mongoose------------------------//

const mongoose = require('mongoose');
const { NUMBER } = require('sequelize');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // for now, we don't need this parameter 
    //name: {
    //     type: String,
    //     require: true,

    // },

    email: {
        type: String,
        require: true
    },
    password: {
        type: String, 
        require: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
            quantity: { type: Number, require: true }
        }]
    }

});

userSchema.methods.addToCart = function (product) {

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();


    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
             productId: product._id, 
             quantity: newQuantity
             });
    }

    const updatedCart = {
        items: updatedCartItems
    };

    this.cart = updatedCart;
   return this.save();

}

userSchema.methods.removeFromCart = function(productId){

            const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        this.cart.items = updatedCartItems;

        return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);



