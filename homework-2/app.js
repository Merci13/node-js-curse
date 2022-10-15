const app = require('express');

app.use("/", (res, req, next) => {
    console.log('In the middleware of \"/\" ');


});
app.use("/users", (res, req, next) => {
    console.log('In the middleware of \"/\"users');
});


app.listen(3000);
