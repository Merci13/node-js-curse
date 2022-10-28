

exports.get404  = (req, res, next) =>{
    console.log(req.body, ' --------------------->>>>>');
    res.status(404);
  
//    res.sendFile(paht.join(rootDir,'views','/not-found.html'));
res.render('404', {path: '404'});
};