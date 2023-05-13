


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
const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;



class User {

    constructor(username, email, id, cart) {

        this.username = username;
        this.email = email;
        this._id = id ? new ObjectId(id) : null;
        this.cart = cart;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findingUserById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log("Error in user.js file in findingUserById Method. Error: ", err, " ----------------------->>>");
            });
    }

    addToCart(product) {

        const cartProductIndex = this.cart.findIndex( cp => {
            return cp.productId.toString() === product._id.toString();


        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items ];

        if(cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else{
            updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity});
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: this._id },
                { $set: { cart: updatedCart } }
            );

    }



}






module.exports = User;