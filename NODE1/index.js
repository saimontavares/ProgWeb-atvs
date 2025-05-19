const http = require('http');
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}`})

const PORT = process.env.PORT ?? 3333;
const DIR = process.argv[2] || 'public'

const server = http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    fs.readdir(DIR, (err, files) => {
        files.forEach(f => res.write(`${f}<br>`))
        res.end();
    })
});

server.listen(PORT);
console.log("Servidor rodando na porta " + process.env.PORT)