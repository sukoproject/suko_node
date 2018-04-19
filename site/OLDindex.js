//let http = require('http')
let express = require('express')
let fs = require('fs')
let server = require('http')

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    fs.readFile('index.html', (err, data)=>{
        if(err) {
            response.writeHead(404)
            response.end("file index.html doesn t exist")
        } else {
            response.writeHead(200, {
                'content-type': 'text/html;charset=utf-9'
            }) 
        } 
        response.end(data)
        })
    res.send('Vous êtes à l\'accueil');
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
})
.listen(8080);

/* VERSION SANS EXPRESS*/
/*
server.on('request', (request, response) => {
   
    fs.readFile('index.html', (err, data)=>{
        if(err) {
            response.writeHead(404)
            response.end("file index.html doesn t exist")
        } else {
            response.writeHead(200, {
                'content-type': 'text/html;charset=utf-9'
            }) 
        } 
        response.end(data)
        })
    
    })
server.listen(8080)
*/