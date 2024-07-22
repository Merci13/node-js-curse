const User = require('../models/user');
const { validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.status = 422;
            error.data = erros.array();
            throw error;
        }

        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hashPassword = await bcrypt.hash(password, 12);

        const user = new User({
            emai: email,
            password: hashPassword,
            name: name
        });
        const result = await user.save();

        res.status(200).json({ message: "User created!", userId: result._id });

    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    }





}

exports.login = async (req, res, next) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;

        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        //=========JWT============
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
            '<YOUR SECRET KEY VALUE>', //this value is by you choice and don't be showed 
            { expiresIn: '1h' }
        );

        //=========JWT============

        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        return;

    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
        return err;
    };



}

exports.getUserStatus = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId)

        if (!user) {

            const error = new Error("User not foudn!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ status: user.status });

    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    }
}

exports.updateUserStatus = async (req, res, next) => {
    try {
        const newStatus = req.body.status;
        const user = await User.findById(req.userId);

        if (!user) {

            const error = new Error("User not foudn!");
            error.statusCode = 404;
            throw error;
        }
        user.status = newStatus;
        await user.save();

        res.status(200).json({ message: "User updated!" });


    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    }

}