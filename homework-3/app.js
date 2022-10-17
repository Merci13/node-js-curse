const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');


app.use(bodyParser.urlencoded({extended: false}));
app.use(userRoutes);
app.use(adminRoutes);
app.use(express.static(path.join(rootDir, 'public')));


//if don't match with anything, then should redirect to page 404
app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', 'not-found.html'));
});

app.listen(3000);