
const express = require('express');


const app = express();


// app.use((req, res, next) => {
//     console.log('in the middle ware');
//     next(); // allows to the request to continue to the next middleware in line
// });
app.use('/add-product',(req, res, next) => {
    console.log('in the middle ware');
    res.send('<h1>Add product page</>');
});


app.use('/',(req, res, next) => {
    console.log('in the middle ware');
    res.send('<h1>Hello from Express.js</>');
});

app.listen(3000);