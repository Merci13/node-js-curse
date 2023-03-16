// const mysql = require('mysql2');

// //create a pool of conections to increase the performance 

// const pool = mysql.createPool({

//     host: 'localhost', // the host where the data base is hosted
//     user: 'root', //this is by default, it can be change as you need it
//     database: 'node-complete', //database name
//     password: 'need1992'
    
// });

// module.exports = pool.promise();

//----------------------------------------------------------------------//

//In order to use squelize package we need to 
//configure it to use mysql2 package and make the conecction with the data base
//

const Sequelize = require('sequelize'); // when the constant is capitalize means that we are using a constructor;


const sequelize = new Sequelize(
    'node-complete',//data base name
    'root', // username from the data base
    'need1992',// password
    {dialect: 'mysql',
    host: 'localhost'
    }
);
module.exports = sequelize;