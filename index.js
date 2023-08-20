const  http  = require('node:http');

http.createServer((req, res) => {

    console.log(`request received on worker ${process.pid}`)
    if(!!(Math.round(Math.random()))) throw Error("oops!")

    setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }, 2000);



  
}
).listen(3000)

