
const paht = require('path');

const express = require('express');
const bodyParser = require('body-parser');//package to help getting data from request
//const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;

//----------------Sequelize----------------------//
// const sequelize = require('./utils/database');//this will be the pool for conections
// const Product = require('./models/product');
// const User = require('./models/user');




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

//ToDo in the future we will update this routes to work with MongoDB
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');



const rootDir = require('./utils/path');
//----------------Sequelize-------------------//
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(paht.join(rootDir, 'public')));//take in mind that with this, the path start in the public folder

app.use((req, res, next) => {
    //-----Sequelize------//
    // User.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next();
    //  })
    // .catch(err => { console.log("Error: ", err, "----------------->>>") });

    next();

});


/**
 * module.exports = path.dirname(require.main.filename);
 */

app.use(
    // '/add-product', 
    adminRoutes);
    
app.use(shopRoutes);

app.use(errorController.get404);

// app.use((req, res, next) => {
//     console.log('in the middle ware');
//     next(); // allows to the request to continue to the next middleware in line
// });

//---------------SQL and Sequelize---------------------------------//

// Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });

// User.hasMany(Product);

// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsTo(Cart, {through: CartItem});

// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through : OrderItem});


// sequelize.sync(
//     //ToDo apply this function to merge, in order to update the database 
//     // {
//     //     force: true, 
//     // }
// ).then(result => {

//     return User.findByPk(1);

// })
//     .then(user => {
//         if (!user) {
//             return User.create({
//                 name: "Patito",
//                 email: "patito@test.com"
//             });
//         }
//         //return Promise.resolve(user);//a way to return a promise
//         return user;
//     })
//     .then(user => {
//         // console.log(user);

//         return user.createCart();
        
//     }).then( cart => {
//         app.listen(3000);
//     })
//     .catch(err => { console.log(err) });



//-------------------------MONGO DB --------------------------------//

mongoConnect(() => {
    app.listen(3000);
});