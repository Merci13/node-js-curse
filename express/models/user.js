


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

    constructor(username, email, id){

        this.username = username;
        this.email = email;
        this._id = id ? new ObjectId(id) : null;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findingUserById(userId){
        const db = getDb();
        return db.collection('users').findOne({_id: new ObjectId(userId)});
    }



}






module.exports = User;