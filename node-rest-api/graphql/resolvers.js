const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: async function ({ userInput }, req) {

        //const email = args.userInput.email;
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'Email is invalid' });
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
            errors.push({ message: "Password to short" });
        }
        if (errors.length > 0) {
            const error = new Error('invalid Input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }
        const hasedPw = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hasedPw
        });

        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    },

    login: async function ({ email, password }, req) {

        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;

        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error('Password is incorrect');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, '<YOUR KEY>', { expiresIn: '1h' });

        return { token: token, userId: user._id.toString() };




    },

    createPost: async function ({ postInput }, req) {
        if(!req.isAuth){
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }

        const errors = [];

        if (validator.isEmpty('postInput.title')
            || !validator.isLength(postInput.title, { min: 5 })) {
            errors.push({ message: 'Title is invalid' })
        }
        if (validator.isEmpty('postInput.content')
            || !validator.isLength(postInput.content, { min: 5 })) {
            errors.push({ message: 'Title is invalid' })
        }
        if (errors.length > 0) {
            const error = new Error('invalid Input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('invalid user.');
            error.code = 401;
            throw error;
        }



        const post = new Post({
            title: postInput.title,
            content: postInput.content,
            imageUrl: postInput.imageUrl,
            creator: user


        });
        const createdPost = await post.save();
        user.posts.push(createdPost);
        await user.save();
        return {
            ...createdPost._doc,
            _id: createdPost._id.toString(),
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        };




    }



};