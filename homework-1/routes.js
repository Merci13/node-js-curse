

const requesHandler = (req, res) => {
        const url = req.url;
        const method = req.method;


        if (url === '/') {
            res.write('<html>');
            res.write('<head> <title> Hello from Homework 1 Node.js course </title></head>');
            res.write('<body><form action="/create-username" method = "POST" > <input type="text" name="create-username" hint="user name"> <button type="submit"> Send user name</button></input></form> </body>');
            res.write('</html>');
            return res.end();
        }
        if (url === '/users') {
            
            res.write('<html>');
            res.write('<head> <title> Dummy Users list</title></head>');
            res.write('<body> <ul> <li> User 1</li></ul><ul> <li> User 2</li></ul><ul> <li> User 3</li></ul><ul> <li> User 4</li></ul><ul> <li> User 5</li></ul></body>');
            res.write('</html>');
            return res.end();
        
        }
        if(url === '/create-username' && method === 'POST'){
            const body = [];
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
        
            });
            return req.on('end', () => {
                const parseBody = Buffer.concat(body).toString();
                const message = parseBody.split('=')[1];//
                 console.log(message);
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
        
            });
        
        
        }
        
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head> <title> My first Page </title></head>');
        res.write('<body><h1> Hello from Homework 1  Node.js course </h1> </body>');
        res.write('</html>');
        res.end();


}

module.exports = requesHandler;