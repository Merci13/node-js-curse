
const express = require('express');
const app = express();
const bodyParser = require('body-parser');//package to help getting data from request

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({extended: false}))

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) =>{
    res.status(404);
    res.send('<h1>Page Not Found</h1>');
});

// app.use((req, res, next) => {
//     console.log('in the middle ware');
//     next(); // allows to the request to continue to the next middleware in line
// });





app.listen(3000);