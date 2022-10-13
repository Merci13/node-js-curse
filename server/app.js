const http = require('http');
const routes = require('./routes')


const server = http.createServer(routes);//execute with every request that are incoming

server.listen(
    3000   //port of the server
);