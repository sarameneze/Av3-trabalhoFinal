const express = require('express');
const server = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const { urlencoded } = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


server.get("/", (req, res) => {
    res.redirect("/cadastrar")
})

server.get("/cadastrar", (req, res) => {
    html = `
    <form method="post" action="/cadastrar">
    <h2>Cadastrar usuario</h2>
    <br>
    <input style="margin-top: 5px" name="nome" type="text" placeholder="Nome de usuario"/>
    <br>
    <input style="margin-top: 5px" name="login" type="text" placeholder="Login"/>
    <br>
    <input style="margin-top: 5px" name="senha" type="password" placeholder="Senha"/>
    <br>
    <input style="margin-top: 5px" name="email" type="text" placeholder="E-mail"/>
    <br>
    <input style="margin-top: 5px" name="cpf" type="text" placeholder="CPF"/>
    <br>
    <button style="margin-top: 5px" type="submit">Cadastrar</button>
    <br>
    <br>
    <br>
    </form>
    
    <form method="get" action="esqueciSenha">
    <button>Esqueci minha senha</button>
    </form>`

    res.send(html)
})

server.get("/esqueciSenha",(req, res) => {
    html = `
    <input style="margin-top: 5px" name="login" type="text" placeholder="Login"/>
    <input style="margin-top: 5px" name="senha1" type="password" placeholder="Nova senha"/>
    <input style="margin-top: 5px" name="senha2" type="password" placeholder="Repita a senha"/>
    <form method="post" action="/esqueciSenha">
    <button style="margin-top:10px">Redefinir senha</button>`

    res.send(html)
})

server.post("/esqueciSenha", urlencodedParser, (req, res) => {
    const {
        senha1,
        senha2,
        login
    } = req.body;

    res.redirect("/index");
})

server.post("/cadastrar", urlencodedParser, (req, res) => {
    let usuarios = require("./usuarios.json");
    console.log(usuarios)
    const id = usuarios.length+1;
    const { 
        nome,
        login,
        senha,
        email,
        cpf
    } = req.body;

    const novoUsuario = {
        id: id,
        nome: nome,
        login: login,
        senha: senha,
        email: email,
        cpf: cpf

    }

    usuarios.push(novoUsuario);

    fs.writeFileSync("./usuarios.json", JSON.stringify(usuarios, null, 2) )

    return res.redirect("/index");
})

server.post("/faq", (req, res) => {
    html = `
    `

    res.send(html)
})

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
    html = `
    <!doctype html>
<html>
    <head>
    <title> Perguntas </title>
    <meta charset="utf-8">
  </head>
  
  
   <body background= "imagens/fundo2.png">
    <table boder= "1" width= "900" align= "center">
  <tr>
    <td align="right">
        <a href="/html/index.html">Home</a>
       <a href="/html/produtos.html">Produtos</a>
      <a href="/html/contatos.html">Contatos</a>
      <a href="">Perguntas</a>
    </td>  
  </tr>    
  
  <tr>
    <td colspan="2">
   <h2>Faça sua pergunta aqui</h2>
   
   <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis molestie dolor, a cursus est dignissim et. Phasellus consequat consequat massa, at pulvinar diam malesuada nec. Nulla non tempus sem. Maecenas posuere risus id quam pellentesque, sit amet molestie elit semper. Sed sit amet semper ipsum. 
  </p>   
  
  <hr>
  
  <form method="post" action="/perguntas">
    Seu e-mail: <br>
    <input type="text" name="email"><br>
    Assunto: <br>
    <input type="text" name="assunto"><br>
    Descriçao: <br>
    <textarea value="pergunta"></textarea>
    <br>
    <button>Enviar</button>
  </form>`

  res.send(html)
});

server.post("/perguntas", (req, res) => {
    
    const { pergunta } = req.body
    html = `<h3>Pergunta enviada com sucesso!</h3>
    <br>
    <h2>Sua pergunta:</h2>
    <br>
    <h2>${pergunta}</h2>`

    res.send(html)
})

server.get('/objetivos', (req, res) => {
    res.sendFile(__dirname + "/html/objetivos.html");
});



server.listen(3000, () => {
    console.log('Servidor está funcionando......')
});