const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }

    const token = req.get('Authorization').split(' ')[1];

    try{
        decodedToken = jwt.verify(token, '<YOUR SECRET KEY VALUE>')
    }catch(err){

        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();



}
