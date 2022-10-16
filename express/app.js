
const express = require('express');
const app = express();
const paht = require('path');
const bodyParser = require('body-parser');//package to help getting data from request

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

/**
 * module.exports = path.dirname(require.main.filename);
 */

app.use(bodyParser.urlencoded({extended: false}))

app.use(adminRoutes);
app.use(shopRoutes);
app.use(express.static(paht.join(rootDir, 'public')));//take in mind that with this, the path start in the public folder

app.use((req, res, next) =>{
    res.status(404);
   res.sendFile(paht.join(rootDir,'views','not-found.html'));
});

// app.use((req, res, next) => {
//     console.log('in the middle ware');
//     next(); // allows to the request to continue to the next middleware in line
// });





app.listen(3000);