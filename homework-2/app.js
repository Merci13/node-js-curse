const app = require('express');

app.use("/users", (res, req, next) => {
    console.log('In the middleware of \"/\"users');
});

app.use("/", (res, req, next) => {
    console.log('In the middleware of \"/\" ');
});



app.listen(3000);
