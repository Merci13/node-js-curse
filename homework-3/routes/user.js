const expres = require('express');
const path = require('path');
const router = expres.Router();
const rootDir = require('../utils/path');


router.use('/user' , (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'user.html'));
});

module.exports = router;