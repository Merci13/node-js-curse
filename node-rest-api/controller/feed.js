
const { validationResult } = require('express-validator/check')
const Post = require('../models/post');
const { clearImage } = require('../util/clear-image');
const User = require('../models/user');
const io = require('../socket');
const auth = require('../middleware/auth');


exports.getPosts = async (req, res, next) => {

    try {
        const currentPage = req.query.page || 1;
        const perPage = 2;
        let totalItems;
        totalItems = await Post.find()
            .countDocuments();

        const posts = await Postfind()
            .populate('creator')
            .sort({createdAt: -1})
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            message: "Fetched posts successfully.",
            posts: posts,
            totalItems: totalItems,
        });


    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    };

}

exports.createPost = async (req, res, next) => {


    try {

        const erros = validationResult(req);

        if (!erros) {
            const error = new Error("Validation failed, enterred data is incorrct.");
            error.statusCode = 422;
            throw error;
        }

        if (!req.file) {
            const error = new Error("No image provide");
            error.statusCode = 422;
            throw error;
        }

        const imageUrl = req.file.path;
        const title = req.body.title;
        const content = req.body.content;


        const post = new Post({
            title: title,
            content: content,
            imageUrl: imageUrl,
            creator: req.userId

        });
        await post.save();
        const user = await User.findById(req.userId);


        user.posts.push(post);
      const savedUser =  await user.save();

        io.getIO().emit('posts',
             { action: 'create',
                 post: {
                    ...post._doc,
                     creator: { _id: req.userId, name: user.name }
                    } });
        //Create post in db 
        res.status(201).json({
            message: 'Post created successfully',
            post: post,
            creator: { _id: user._id, name: user.name }
        });
        return savedUser;

    } catch (err) {
        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    }



}

exports.getPost = async (req, res, next) => {
    try {

        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error("Could not find post.");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message: "Post Feched",
            post: post
        });


    }
    catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    }




}

exports.updatePost = async (req, res, next) => {
    try {

        const erros = validationResult(req);

        if (!erros) {
            const error = new Error("Validation failed, enterred data is incorrct.");
            error.statusCode = 422;
            throw error;
        }

        if (!req.file) {
            const error = new Error("No image provide");
            error.statusCode = 422;
            throw error;
        }


        const postId = req.params.postId;
        const title = req.body.title;
        const content = req.body.content;
        let imageUrl = req.body.image;
        if (req.file) {
            imageUrl = req.file.path;
        }

        if (!imageUrl) {
            const error = new Error('No file picked');
            error.statusCode = 422;
            throw error;

        }

        const post = await Post.findById(postId).populate('creator');

        if (!post) {

            const error = new Error("Could not find post.");
            error.status = 404;
            throw error;
        }
        if (post.creator._id.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;

        }

        if (imageUrl !== post.imageUrl) {
            clearImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;

        const result = await post.save();
        io.getIO().emit('posts', {action: "update", post: result });

        res.satus(200).json({ message: "Post Updated!", post: result });

    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    };


}

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {

            const error = new Error("Could not find post.");
            error.status = 404;
            throw error;
        }
        if (post.creator.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;

        }
        clearImage(post.imageUrl);

        await Post.findByIdAndDelete(postId);

        const user = User.findById(req.userId);

        user.posts.pull(postId);
        const result = user.save();

        console.log(result);
        io.getIO().emit('posts', { action: 'delete', post: postId});

        res.status(200).json({ message: "Deleted Post" });

    } catch (err) {

        if (!err.statusCode) {
            err.satus = 500;
        }
        next(err);
    }



}

exports.uploadImage = async (req, res, next) =>{
    if(!auth){
        throw new Error("Not authenticated")
    }
    if(!req.file){
        return res.status(200).json({message: "No file provide"});
    }
    if(req.body.oldPath){
        clearImage(req.body.oldPath);
    }
    return res.status(201).json({ message: "File stored.", filePath: req.file.path});


}






