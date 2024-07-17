
const { validationResult } = require('express-validator/check')
const Post = require('../models/post');
const fs = require("fs");
const path = require('path');


exports.getPosts = (req, res, next) => {

    PostFin()
    .then( posts => {
            res.status(200).json({
                message: "Fetched posts successfully.",
                posts: posts
            })
    })
    .catch(err =>{

        if(!err.statusCode ){
            err.satus = 500;
        }
        next(err);
    });
}

exports.createPost = (req, res, next) => {

    const erros = validationResult(req);

    if (!erros) {
        const error = new Error("Validation failed, enterred data is incorrct.");
        error.statusCode = 422;
        throw error;
    }

    if(!req.file){
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
        creator: {
            name: "MAX"
        },

    });
    post.save().then(result => {
        //Create post in db 
        res.status(201).json({
            message: 'Post created successfully',
            post: result
        });
    }).catch(err => {
        if(!err.statusCode ){
            err.satus = 500;
        }
        next(err);
    });



}

exports.getPost = (req, res, next) =>{
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error("Could not find post.");
            error.status = 404;
            throw error;
        }
            res.status(200).json({
                message: "Post Feched",
                post: post
            });


    })
    .catch( err => {

        if(!err.statusCode ){
            err.satus = 500;
        }
        next(err);
    }

    )


}

exports.updatePost = (req, res, next) =>{

    const erros = validationResult(req);

    if (!erros) {
        const error = new Error("Validation failed, enterred data is incorrct.");
        error.statusCode = 422;
        throw error;
    }

    if(!req.file){
        const error = new Error("No image provide");
        error.statusCode = 422;
        throw error;
    }


    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if(req.file) {
        imageUrl = req.file.path;
    }

    if(!imageUrl){
        const error = new Error('No file picked');
        error.statusCode = 422;
        throw error;

    }

    Post.findById(postId)
    .then(post => {
        if(!post){

            const error = new Error("Could not find post.");
            error.status = 404;
            throw error;
        }
        if(imageUrl !== post.imageUrl){
            clearImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
         
        return post.save();

        
    })
    .then(result => {
        res.satus(200).json({message: "Post Updated!", post: result});
    })
    .catch(err => {

        if(!err.statusCode ){
            err.satus = 500;
        }
        next(err);
    });


}


const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}

