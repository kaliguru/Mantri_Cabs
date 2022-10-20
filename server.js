const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const host = "localhost";

const server = http.createServer(app);

server.listen(port,host,()=>{console.log('app is running on localhost:'+port)});
