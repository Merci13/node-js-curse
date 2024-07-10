module.exports = (req, res, nexth) =>{
    if(!req.session.isLoggedIn){
        return res.redirect('login');
    }
    nexth();
}