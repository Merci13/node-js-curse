const jwt = require('jsonwebtoken');





module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        next();
    }

    const token = req.get('Authorization').split(' ')[1];

    try{
        decodedToken = jwt.verify(token, '<YOUR SECRET KEY VALUE>')
    }catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        
        req.isAuth = false;
        return next();
    }

    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();



}
