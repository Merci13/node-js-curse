const fs = require('fs');

const requesHandler = (request, response) => {

    const url = request.url;
    const method = request.method;


    if (url === '/') {
        response.write('<html>');
        response.write('<head> <title> Enter message </title></head>');
        response.write('<body><form action="/message" method = "POST" > <input type="text" name="message"> <button type="submit"> Send</button></input></form> </body>');
        response.write('</html>');
        return response.end();
    }
    if (url === '/message' && method === 'POST') {
    
        const body = [];
        request.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
    
        });//listen to certain events
        return request.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];//
            fs.writeFile('message.txt', message, (error)=>{
    
    
            response.statusCode = 302;
            response.setHeader('Location', '/');
    
            return response.end();
            });
    
        });//execute when "on" method is finished;
    
    
    }
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head> <title> My first Page </title></head>');
    response.write('<body><h1> Hello from my Node.js Server </h1> </body>');
    response.write('</html>');
    response.end();

}

module.exports = requesHandler;
//you can also use the next syntaxis

/**
 * module.exports = {
 * handler : requesHandler,
 * someText: 'Some hard text setted'
 * 
 * }
 * 
 */

//also you can set every handler / method that you want to export doing something like next:
/**
 * module.exports.handler = requestHandler;
 * module.exports.someText = 'Some hard Text setted';
 * 
 * 
 */
//shortcut supported by node is doing something like next:
/**
 * exports.handler = requestHandler;
 * 
 */

