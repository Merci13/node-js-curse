const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');


const MONGO_DB_URI = 'mongodb+srv://mrjorxe:6WGskEOsiBdWVqzW@nodejsproyect.kfi6ldo.mongodb.net/message?retryWrites=true&w=majority';


const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images');

    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true);

    }else{
        cb(null, false);
    }
}


app.use(bodyParser.json()); // application/json
app.use(multer({storage: fileStorage, fileFilter: fileFilter})).single('image');
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin', //allow CORS 
         '*'                            // '*' -> means that anyone can access
        );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

});


app.use('/feed',feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500; 
    const message = error.message;
    res.status(status).json({message: message});
});

moongoose
    .connect(MONGO_DB_URI)
    .then(result => {
        app.listen(8080);//port to be listen for request
    }
    ).catch(err => {
        console.log(err + '------------->>>>');
    });


