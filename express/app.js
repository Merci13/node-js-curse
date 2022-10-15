const htpp = require('http');
const express = require('express');


const app = express();


app.use((req, res, next) => {
    console.log('in the middle ware');
    next();
});

const server = htpp.createServer(app);


server.listen(3000);