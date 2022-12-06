const express = require('express');
const server = express();

server.get('/index', (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
});

server.get('/contatos', (req, res) => {
    res.sendFile(__dirname + "/html/contatos.html");
});

server.get('/produtos', (req, res) => {
    res.sendFile(__dirname + "/html/produtos.html");
});

server.get('/perguntas', (req, res) => {
    res.sendFile(__dirname + "/html/perguntas.html");
});

server.get('/objetivos', (req, res) => {
    res.sendFile(__dirname + "/html/objetivos.html");
});



server.listen(3000, () => {
    console.log('Servidor está funcionando......')
});