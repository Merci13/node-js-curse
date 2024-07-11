const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTranspor = require('nodemailer-sendgrid-transport');
const path = require('../utils/path');
const cypto = require('crypto');
const { validationResult } = require('express-validator/check');
const { ValidationError } = require('sequelize');

//A3ECPD71JXMVGU5QSAH5NYK7


const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'mrjorxe@gmail.com',
            pass: "YOURPASSWORD"
        }
    }

);

exports.getLogin = (req, res, next) => {

    //    const isLoggedIn = req.get('Cookie').split('=')[1].trim() === 'true';



    let message = req.flash('error');
    if (message.length > 0) {

        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput: {
            email: '',
            password: ''
        },
        validationErrors: []
    });
}
exports.getSignup = (req, res, next) => {

    let message = req.flash('error');
    if (message.length > 0) {

        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
        oldInput: {email: "", password: "", confirmPassword: ""},
        validationErrors: [],
    })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');

    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
           return  res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    email: email,
                    password: password
                },
                validationErrors : errors.array()

            });
    }

    User.findOne({ email: email }).then(user => {
        if (!user) {

            return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                errorMessage: 'Invalid email or password.',
                oldInput: {
                    email: email,
                    password: password
                },
                validationErrors : []

            });
        } else {
            bcrypt.compare(password, user.password)//return a bolean if is true, the comparison are equals else not
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            console.log("Error in controller/auth.js in postLogin method. Error: " + err + "------------>>>>");
                            res.redirect('/');
                        });
                    } else {
                        return res.status(422).render('auth/login', {
                            path: '/login',
                            pageTitle: 'Login',
                            errorMessage: 'Invalid email or password.',
                            oldInput: {
                                email: email,
                                password: password
                            },
                            validationErrors : []
            
                        });
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).//validation fails.
            render('auth/signupt', {
                path: '/signup',
                pageTitle: "Signup",
                errorMessage: errors.array()[0].msg, 
                oldInput:{ email: email, password: password, confirmPassword: req.body.confirmPassword} ,
                validationErrors: errors.array()
            
            });
    }

    bcrypt.hash(password, 12)
        .then(hassedPassword => {
            const user = new User({
                email: email,
                password: hassedPassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            transporter.sendMail({
                to: email,
                from: "nodecurse@node.com.test",
                subject: "Succed",
                html: '<h1>You successfully signed up!</h1>'
            })
        }).catch(err => {
            console.log("Error in routes/auth.js, error: " + err + " --------->>>>>>")
        });



}


exports.getReset = (req, res, next) => {

    let message = req.flash('error');
    if (message.length > 0) {

        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/reset', {
        path: '/reset',
        pageTitle: "Reset Password",
        errorMessage: message
    });
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }

        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', "No account with that email found.");
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                user.save();


            }).then(result => {
                res.redirect('/');
                transporter.sendMail({
                    to: req.body.email,
                    from: "nodecurse@node.com.test",
                    subject: "Password Reset",
                    html: `
                    <p> You requested a password reset </p>
                    <p> Click this <a href="http://localhost:3000/reset/${token}"> Link </a> to set a new password</p>
                    
                    `
                });
            })
            .catch(err => {
                console.log("Error in controllers/auth.js in postReset method. Error" + err + " -------------->>>>");
            });
    });
}


exports.getNewPassword = (req, res, next) => {

    //find de user with the token 

    const token = req.params.token;

    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }) //$gt means "greater than"
        .then(user => {

            let message = req.flash('error');
            if (message.length > 0) {

                message = message[0];
            } else {
                message = null;
            }

            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: "New Password",
                errorMessage: message,
                userId: user.id.toString(),
                passowrdToken: token
            });
        })
        .catch(err => {
            console.log("Error in controllers/auth.js in getNewPassword method. Error: " + err + "----------->>>");
        });

};

exports.postNewPassword = (req, res, next) => {

    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newpassword, 12);
        })
        .then(hassedPassword => {
            resetUser.password = hassedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            res.redirect("/login");
        })
        .catch(err => {
            console.log("Error in controllers/auth.js in method postNewPassword. Error: " + err + "----------->>>>")
        });



};
