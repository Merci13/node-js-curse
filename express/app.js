
const paht = require('path');

const express = require('express');
const bodyParser = require('body-parser');//package to help getting data from request
//const expressHbs = require('express-handlebars');

const app = express();

//engines
//app.set('view engine', 'pug');//say to node that we are using template engine and what we are using for.
// app.engine('hbs', expressHbs( 
//     {layoutsdir: 'views/layouts/', 
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }),);//say to node that we are using Handlebars template engine
//app.set('view engine', 'hbs');

app.set('view engine', 'ejs');
app.set('views', 'views');//say to node where are this template

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(paht.join(rootDir, 'public')));//take in mind that with this, the path start in the public folder



/**
 * module.exports = path.dirname(require.main.filename);
 */

app.use(
   // '/add-product', 
    adminData.router);
app.use(shopRoutes);



app.use((req, res, next) =>{
    res.status(404);
    console.log(req.method);
   res.sendFile(paht.join(rootDir,'views','not-found.html'));
});

// app.use((req, res, next) => {
//     console.log('in the middle ware');
//     next(); // allows to the request to continue to the next middleware in line
// });





app.listen(3000);