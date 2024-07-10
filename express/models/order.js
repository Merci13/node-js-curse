
//-----------Sequelize-----------//

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Order = sequelize.define('order', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false, 
//         primaryKey: true
//     }


// });

// module.exports = Order;
//-----------Mongo DB-----------------//
//-----------Mongoose-----------------//

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        products: [{
            product: {    type: Object, required: true },
            quantity: {type: Number, require: true} 
        }],

        user: {
            email:{
                type: String, 
                require: true
            },
            userId: {
                type: Schema.Types.ObjectId,
                require: true, 
                ref: 'User'
            }
        }




    }

);

module.exports = mongoose.model('Order', orderSchema);
