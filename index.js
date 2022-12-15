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

server.get("/esqueciSenha", (req, res) => {
    html = `
    <input style="margin-top: 5px" name="login" type="text" placeholder="Login"/>
    <input style="margin-top: 5px" name="senha1" type="password" placeholder="Nova senha"/>
    <input style="margin-top: 5px" name="senha2" type="password" placeholder="Repita a senha"/>
    <form method="post" action="/esqueciSenha">
    <button style="margin-top:10px">Redefinir senha</button>`

    res.send(html)
})

server.post("/esqueciSenha", urlencodedParser, (req, res) => {
    let usuarios = require("./usuarios.json")
    const {
        senha1,
        senha2,
        login
    } = req.body;

    if (senha1 != senha2) {
        res.redirect("/esqueciSenha")
    } else {
        let usuarioLogado = usuarios.find(usuario => usuario.login == login);
        usuarioLogado.senha == senha1;

        const usuariosAtualizados = usuarios.map(user => {
            if (user.login == usuarioLogado.login) {
                return usuarioLogado;
            } else {
                return user;
            }
        });
        fs.writeFileSync("./usuarios.json", JSON.stringify(usuariosAtualizados, null, 2))
    }

    res.redirect("/index");
})

server.post("/cadastrar", urlencodedParser, (req, res) => {
    let usuarios = require("./usuarios.json");
    const id = usuarios.length + 1;
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

    fs.writeFileSync("./usuarios.json", JSON.stringify(usuarios, null, 2))

    return res.redirect("/index");
})

server.get('/index', (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
});

server.get('/contatos', (req, res) => {
    res.sendFile(__dirname + "/html/contatos.html");
});

server.get('/produtos', (req, res) => {
    html = `
    <!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Produtos - Barbearia Unifor</title>
        <link rel="stylesheet" href="reset.css">
          <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    </head>
    <body>
        <header>
            <div class="caixa">
               
                <nav>
                    <ul>
                          <li><a href="index.html">Home</a></li>
                        <li><a href="produtos.html">Produtos</a></li>
                        <li><a href="contato.html">Contato</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <ul class=produtos>
                <li>
                    <h2>Cabelo</h2>
                    <form method="post" action="cabelo">
                    <button>Ver produto</button>
                    </form>
                    
                    <p class="produto-descricao">Na tesoura ou máquina, como o cliente preferir</p>
                    <p class="produto-preco">R$25,00</p>
                </li>
                <li>
                    <h2>Barba</h2>
                    <form method="post" action="barba">
                    <button>Ver produto</button>
                    </form>
                    
                    <p class="produto-descricao">Corte e desenho profissional de barba</p>
                    <p class="produto-preco">R$18,00</p>
                </li>
                <li>
                    <h2>Cabelo + Barba</h2>
                    <form method="post" action="cabeloBarba">
                    <button>Ver produto</button>
                    </form>
                    
                    <p class="produto-descricao">Corte completo de cabelo e barba</p>
                    <p class="produto-preco">R$35,00</p>
                </li>
            </ul>
        </main>
        <footer>
            
            <p class="copyright">&copy; Copyright Barbearia Unifor - 2022</p>
        </footer>
    </body>
</html>`

res.send(html)
});

server.get('/perguntas', (req, res) => {
    html = `
    <!doctype html>
<html>
    <head>
    <title> Perguntas </title>
    <meta charset="utf-8">
  </head>
  
  
   <body background="imagens/fundo2.png">
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

server.get('/excluir', (req, res) => {
    res.sendFile(__dirname + "/html/excluir.html");
});

server.get('/mulheres', (req, res) => {
    res.sendFile(__dirname + "/html/mulheres.html");
});

server.get('/marcar', (req, res) => {
    res.sendFile(__dirname + "/html/marcar.html");
});

server.get("/reembolso", (req, res) => {
    html = `
    <h2>Reembolso</h2>
    <input style="margin-top: 5px" name="nome" type="text" placeholder="Nome de usuario"/>
    <br>
    <input style="margin-top: 5px" name="email" type="text" placeholder="E-mail"/>
    <br>
    <input style="margin-top: 5px" name="motivo" type="text" placeholder="Motivo do pedido"/>
    <br>
    <textarea style="margin-top: 5px" value="pergunta"></textarea>
    <form method="post" action="/reembolso">
    <button style="margin-top: 5px">Enviar pedido</button>
    </form>
    `

    res.send(html)
})

server.post("/reembolso", urlencodedParser, (req, res) => {
    html = `
    <h1>Seu pedido de reembolso será analisado!</h1>`

    res.send(html)
})

server.post("/cabelo", urlencodedParser, (req, res) => {
    html = `
    <div>
    <img src=https://salaovirtual.org/wp-content/uploads/2016/04/topetes-pomada.jpg.webp style="max-width:100">
    </div>
    <button style="margin-top:15px">Adicionar ao carrinho</button>`

    res.send(html)
})

server.post("/barba", urlencodedParser, (req, res) => {
    html = `
    <div>
    <img src=https://i.pinimg.com/originals/e0/fd/a1/e0fda1b380107103774d7a0e9243483d.jpg style="max-width:100">
    </div>
    <button style="margin-top:15px">Adicionar ao carrinho</button>`

    res.send(html)
})

server.post("/cabeloBarba", urlencodedParser, (req, res) => {
    html = `
    <div>
    <img src=https://www.felps.com.br/wp-content/uploads/2019/06/Guia-B%C3%A1sico-Aprenda-A-Combinar-Barba-E-Cabelo-5.jpg style="max-width:100">
    </div>
    <button style="margin-top:15px">Adicionar ao carrinho</button>`

    res.send(html)
})

server.post("/pinturas", urlencodedParser, (req, res) => {
    html = `
    <img style="max-width:50%" src="https://blog.agatamarket.com/wp-content/uploads/2018/06/tintura-permanente-organica-cabelos.jpg">
    `

    res.send(html)
})



server.listen(3000, () => {
    console.log('Servidor está funcionando......')
});