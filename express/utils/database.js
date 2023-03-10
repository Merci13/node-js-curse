const mysql = require('mysql2');

//create a pool of conections to increase the performance 

const pool = mysql.createPool({

    host: 'localhost', // the host where the data base is hosted
    user: 'root', //this is by default, it can be change as you need it
    database: 'node-complete', //database name
    password: 'need1992'
    
});

module.exports = pool.promise();