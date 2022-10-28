

const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products..json'
);


const getProductsFromFile = callBack => {


    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callBack([]);
        }
        callBack(JSON.parse(fileContent));


    });
}



module.exports = class Product {



    constructor(title) {
        this.title = title;
    }



    save() {
        // products.push(this); //'this' words make reference of the variable in the constructor method

        getProductsFromFile(products => {
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);

    }
}