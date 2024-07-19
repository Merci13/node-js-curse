
const paht = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');//package to help getting data from request
//const expressHbs = require('express-handlebars');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');


//----------------Mongoose----------------------//
const moongoose = require('mongoose');
//----------------Mongoose----------------------//

//---------------Sessions---------------------//
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
//---------------Sessions---------------------//


const errorController = require('./controllers/error');
//const mongoConnect = require('./utils/database').mongoConnect;


const User = require('./models/user');
const csrfProtection = csrf();

//===========SSL setup ==================
// const privateKey = fs.readFileSync('server.key');//block continuity until the process is finish
// const certificate = fs.readFileSync('server.cert');

//===========SSL setup ==================
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images',)
    }, 
    filename: (req, file, cb) => {
        cb(null,new Date().toISOString() + "-" + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){

        cb(null, true, );
    }else{

        cb(null, false, );
    }

}

//----------------Sequelize----------------------//
// const sequelize = require('./utils/database');//this will be the pool for conections
// const Product = require('./models/product');
// const User = require('./models/user');


const MONGO_DB_URI =
 `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodejsproyect.kfi6ldo.mongodb.net/${process.env.MONGO_DATA_BASE}?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
    uri: MONGO_DB_URI,
    collection: 'sessions',

});

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
const authRoutes = require('./routes/auth');

/**
 * create a file to log in it,
 * flags: 
 *          'a' means add at the end of the file
 *      
 * For a more advanced/ detailed approach on logging (with higher control),
 *  see this article: https://blog.risingstack.com/node-js-logging-tutorial/    
 */
const accesslogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a',

})

app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accesslogStream}));//morgan use accessLogStream to writes the logs 

const rootDir = require('./utils/path');
//----------------Sequelize-------------------//
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

//-----------------MiddleWares-------------------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
    dest: 'images', //directory to be store the images in the server side
    storage: fileStorage,
    fileFilter: fileFilter
}).single(
'image' // this name represent the name of the input that we are expecting get the file
));
app.use(express.static(paht.join(rootDir, 'public')));//take in mind that with this, the path start in the public folder
app.use('/images',express.static(paht.join(rootDir, 'images')));//if we had a request that start with "/images"  then serve this file staticly 

app.use(session({
    secret: 'my secret', //this secret has to be a long string value in production
    resave: false,
    saveUninitialized: false,
    //you could configure your cookie here adding the value "cookie" and passing the js object with the configuration. example: cookie:{max-age: 10}
    store: store
}));

app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();

})
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            if(!user){
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
             console.log("Error: ", err, "----------------->>>");
             next(new Error(err));
            });

});
//-----------------MiddleWares-------------------//


// app.use((req, res, next) => {
//-----Sequelize------//
// User.findByPk(1)
// .then(user => {
//     req.user = user;
//     next();
//  })
// .catch(err => { console.log("Error: ", err, "----------------->>>") });

//-----MongoDB----//
// User.findingUserById("6457b588ea161f122e26ab4e")
//     .then(user => {
//         req.user = new User(user.name, user.email, user._id, user.cart);
//         next();
//     })
//     .catch(err => { console.log("Error: ", err, "----------------->>>") });

//-----Mongoose----//
// User.findById("66072470824c4ed989c7afbc")
//     .then(user => {
//         req.user = user;
//         next();
//     })
//     .catch(err => { console.log("Error: ", err, "----------------->>>") });




// });


/**
 * module.exports = path.dirname(require.main.filename);
 */



app.use(
    // '/add-product', 
    adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);

app.get('/500',errorController.get500 );

app.use(errorController.get404);

app.use((error, req, res, next) =>{
    res.redirect('/500');
    res.statis(500).render("/500", {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
});

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

// mongoConnect(() => {

//     app.listen(3000);
// });

//----------------Mongoose----------------------//

moongoose
    .connect(MONGO_DB_URI)
    .then(result => {
         app.listen(process.env.PORT || 3000);
      //  https.createServer({ key: privateKey, cert: certificate},app).listen(process.env.PORT || 3000);
    }
    ).catch(err => {
        console.log(err + '------------->>>>');
    });