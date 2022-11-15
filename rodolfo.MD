<h1>INSTRUÇÕES PARA O RODOLFO</h1>
Professor, como você bem sabe, VM's são caras. Por ora, decidimos rodar nosso projeto localmente, apesar de que, muito em breve, abriremos contas para beta tester, e aí o servidor estará ligado.
<hr>
<h2>Para rodar o projeto:</h2>
<ul>
  <li>NodeJS (npm ou yarn)</li>
  <li>MySQL</li>
</ul>

Passo 1: baixe o diretório do projeto;<br>
Passo 2: utilize o comando <code>npm install</code> para instalar as dependências;<br>
Passo 3: coloque o usuário e a senha do SQL no JSON do arquivo <code>database.js</code> na pasta database;<br>
Passo 4: Importe o banco, você pode baixá-lo clicando <a href="https://github.com/agora-verbum/images/raw/main/script.sql">aqui</a>, <a href="https://github.com/agora-verbum/images/raw/main/script.sql">aqui</a> ou <a href="https://github.com/agora-verbum/images/raw/main/script.sql">aqui</a><br>
Passo 5: Rode a API utilizando o comando <code>npx nodemon index.js</code><br>

<hr>
<h2>IMPORTANTE: </h2>

Nós estamos migrando de tecnologia (Sequelize -> Knex) então o código está BEM bagunçado. Claro, depois de uns ajustes todas as rotas voltarão ao normal.<br>
Para enviar as requisições localmente é necessário utilizar outros meios, o fetch, por exemplo, não dá conta disso. Particularmente, optamos por usar o <a href="https://www.postman.com/">Postman</a>.
