"use strict";
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
const numResults = [];
const textResults = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    else {
        return +num1 + +num2;
    }
}
function printResult(resultObject) {
    console.log(resultObject.val);
}
if (buttonElement) {
    buttonElement.addEventListener('click', () => {
        var _a, _b;
        const num1 = (_a = num1Element.nodeValue) !== null && _a !== void 0 ? _a : "0";
        const num2 = (_b = num2Element.nodeValue) !== null && _b !== void 0 ? _b : "0";
        const result = add(+num1, +num2);
        numResults.push(result);
        const stringResult = add(+num1, +num2);
        textResults.push(stringResult);
        printResult({ val: result, timestamp: new Date() });
        console.log(numResults, textResults);
    });
}
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
    }, 1000);
});
myPromise.then((result) => {
    console.log(result);
});
