const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const host = '139.59.44.34';

const server = http.createServer(app);

server.listen(port,host,()=>{console.log('app is running on localhost:'+port)});
