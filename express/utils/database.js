// const mysql = require('mysql2');

// //create a pool of conections to increase the performance 

// const pool = mysql.createPool({

//     host: 'localhost', // the host where the data base is hosted
//     user: 'root', //this is by default, it can be change as you need it
//     database: 'node-complete', //database name
//     password: 'need1992'

// });

// module.exports = pool.promise();

//--------------------------Sequelize--------------------------------------------//

//In order to use squelize package we need to 
//configure it to use mysql2 package and make the conecction with the data base
//

// const Sequelize = require('sequelize'); // when the constant is capitalize means that we are using a constructor;


// const sequelize = new Sequelize(
//     'node-complete',//data base name
//     'root', // username from the data base
//     '',// password
//     {dialect: 'mysql',
//     host: 'localhost'
//     }
// );
// module.exports = sequelize;

//-----------------------------Mongo Db ----------------------------//

const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callBack) => {

    //Connect  mongodb+srv://mrjorxe:<password>@nodejsproyect.kfi6ldo.mongodb.net/
    MongoClient.connect('mongodb+srv://mrjorxe:6WGskEOsiBdWVqzW@nodejsproyect.kfi6ldo.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('CONNECTED ------------>>>>>');
            _db = client.db();
            callBack();

        })
        .catch(err => { 
            console.log("Error trying to conecct with MongoDB: ", err, "------------>>>>>>>") ;
            throw err;

        });

};

const getDb = () => {

    if(_db){
        return _db;
    }
    throw "Not DataBase Found!-------------->>>";

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;