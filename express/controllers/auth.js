const User = require('../models/user');
const bcrypt = require('bcrypt.js');

exports.getLogin = (req, res, next) => {

    //    const isLoggedIn = req.get('Cookie').split('=')[1].trim() === 'true';




    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false//req.user.isLoggedIn
    });
}
exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.redirect('/login');
        } else {
            bcrypt.compare(password, user.password)//return a bolean if is true, the comparison are equals else not
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                      return  req.session.save((err) => {
                            console.log("Error in controller/auth.js in postLogin method. Error: " + err + "------------>>>>");
                            res.redirect('/');
                        });
                        return res.redirect('/');
                    } else {
                        res.redirect('/login');
                    }
                })
                .catch(err => {
                    console.log("Error in controller/auth.js in postLogin method. Error: " + err + "------------>>>>");
                    res.redirect('/login')
                });
        }

    })

}

exports.postLogout = (req, res, next) => {

    req.session.destroy((err) => {

        console.log(err);
        res.redirect('/');

    });

}

exports.postSignup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email }).then(userDoc => {
        if (userDoc) {
            return res.redirect('/signup');
        } else {

            return bcrypt.hash(password, 12)
                .then(hassedPassword => {
                    const user = new User({
                        email: email,
                        password: hassedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/');
                })
                ;

        }
    }).catch(err => {
        console.log("Error in routes/auth.js, error: " + err + " --------->>>>>>")
    });



}
