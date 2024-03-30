const User =  require('../models/user');

exports.getLogin = (req, res, next) => {

//    const isLoggedIn = req.get('Cookie').split('=')[1].trim() === 'true';




    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false//req.user.isLoggedIn
     });
 }

 exports.postLogin = (req, res, next) => {
   // res.setHeader('Set-Cookie', 'loggedIn=true');

  

       User.findById("66072470824c4ed989c7afbc")
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err)=> {
                console.log(err);
                res.redirect('/');

            });
        })
        .catch(err => { console.log("Error: ", err, "----------------->>>") });

    }

    exports.postLogout = (req, res, next) =>{

        req.session.destroy((err)=> {

            console.log(err);
            res.redirect('/');

        });

    }
 