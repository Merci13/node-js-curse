

exports.get404 = (req, res, next) => {
    console.log(req.body, ' --------------------->>>>>');
    res.status(404);

    //    res.sendFile(paht.join(rootDir,'views','/not-found.html'));
    res.render('404', {
        path: '404',
        pageTitle:"Not Found!",
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.get500 = (req, res, next) => {
    console.log(req.body, ' --------------------->>>>>');
    res.status(500);
    //    res.sendFile(paht.join(rootDir,'views','/not-found.html'));
    res.render('500', {
        path: '500',
        pageTitle: "Error!",
        isAuthenticated: req.session.isLoggedIn
    });
};