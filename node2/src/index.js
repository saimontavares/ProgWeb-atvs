import http from 'http'
import fs from 'fs'
import dotenv from 'dotenv'
import { createLink } from './util.js'

dotenv.config({path:`.env.${process.env.NODE_ENV}`})

const PORT = process.env.PORT ?? 3333;
const DIR = process.argv[2] ?? 'public'

const server = http.createServer(function(req, res) {
    let output = ''
    let abreArquivo = false
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    fs.readdir(DIR, (err, files) => {
        if (err) {
            res.write('erro')
            res.end()
            return;
        }
        else{
            files.forEach(file => {
                /* res.write(`${file}<br>`); */
                if(req.url.endsWith(file)){
                    abreArquivo = true
                    fs.readFile(DIR+req.url, (error, f)=> {
                        if (error) {
                            res.end()
                            return;
                        }
                        else{
                            output = '<a href="/">Voltar</a><br><p>'+f.toString()+'</p>'
                            res.write(output)
                            res.end()
                            return;
                        }
                    })
                }
                if(abreArquivo){
                    return
                }
                else{
                    output += createLink(file);
                }
            });
            if(!abreArquivo){
                res.write(output)
                res.end();
            }
        }
    })
});

server.listen(PORT);