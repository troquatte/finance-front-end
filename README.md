<h1 align="center">
  <img src="https://vidafullstack.com.br/wp-content/uploads/2020/04/angular.png" alt="" width="150">
  <br>
    Desafio feito para Vaga Engenheiro Front-end Itaú.
</h1>

## :custard: Descrição

Arquitetura e criação do back-end ( microserviços ), front-end e docker ( compose )

<strong>Front-end:</strong> Foi usado Angular 9 devido sua capacidade de desenvolvimento onde temos uma arquiterura baseada em OOP diferente de outras ferramentas no front-end.

<ul>
  <li>Ngx Bootstrap - Lib Angular que ajuda na criação de telas mantida por um grande player de mercado javascript.</li>
  <li>MomentJs - Usado para validar datas na aplicação deixando de uma forma mais limpa e clara.</li>
</ul>

<strong>Micro serviços Back-end:</strong> Feito em nodeJs com framework adonisJs, uma ferramenta bem rápida e fácil de ser usada e apropriada para o uso de Micro serviços.

<strong>Banco de dados postgres:</strong> o uso está relacionadas à economia e ao alto desempenho para plataforma. 

<br>
 <img src="https://vidafullstack.com.br/wp-content/uploads/2020/04/download.jpg" alt="" width="100%">
<br>

## :information_source: Como usar?

Baixe o arquivo compose docker-compose.yaml

```bash
# Clone this repository 
$ git clone https://github.com/troquatte/finances-docker-compose.git

# Go into the repository
$ cd finances-docker-compose

# Up Docker Compose
$ docker-compose up -d

# Access port
$ http:localhost:80

```

## :information_source: Arquivos usados

Repositório de arquivos usados na aplicação

```bash
# Docker Copose
https://github.com/troquatte/finances-docker-compose

# Front-end - Angular
https://github.com/troquatte/finance-front-end

# Api GateWay
https://github.com/troquatte/finance-api-gateway

# Api Balance
https://github.com/troquatte/finances-api-balance

#Api Expense
https://github.com/troquatte/finance-api-expenses

#Api Data Expense
https://github.com/troquatte/finance-api-data-expenses

#Script Postgres
https://github.com/troquatte/finance-db-postgres

```

## :information_source: Docker Images

Repositório de arquivos usados na aplicação Docker

```bash
# Docker Copose
https://github.com/troquatte/finances-docker-compose

# Front-end - Angular
https://hub.docker.com/repository/docker/dtroquatte/finance-front-end

# Api GateWay
https://hub.docker.com/repository/docker/dtroquatte/finance-api-gateway

# Api Balance
https://hub.docker.com/repository/docker/dtroquatte/finance-api-balance

#Api Expense
https://hub.docker.com/repository/docker/dtroquatte/finance-api-expenses

#Api Data Expense
https://hub.docker.com/repository/docker/dtroquatte/finance-api-data-expenses

#Script Postgres
https://hub.docker.com/repository/docker/dtroquatte/finances-postgres
```

---

Por ♥ Dener Troquatte :wave: [Linkedin!](https://www.linkedin.com/in/dener-s%C3%A3o-pedro-troquatte-ababa079/) | [Blog!](https://vidafullstack.com.br/)


# Backend Tibs-Platform

## :information_source: No Tibs-Platform utilizamos algumas ferramentas como:

<ul>
  <li>NodeJs + TypeScript com Fastify: https://www.fastify.io/</li>
  <li>Banco de dados MongoDB, você pode utilizar o robomongo como gerenciador de interface https://robomongo.org/</li>
  <li>Redis</li>
  <li>Rabbitmq</li>
  <li>E Docker para facilitar nosso ambiente de desenvolvimento</li>
</ul>

Separamos um mapa com explicações breves sobre a aplicação: https://drive.google.com/file/d/16PkMh3cXCNb_9ep7KaaCVgLZ4EE7XuMs/view?usp=sharing

## :information_source: Vamos configurar o ambiente de trabalho?

<p>Iremos utilizar o docker para subir nosso ambiente. Caso não tenha, instale https://www.docker.com</p>
<p><strong>É só seguir os passos abaixo:</strong></p>
<ol>
  <li>Abra o terminal e acesse a pasta do docker <code>cd docker</code></li>
  <li>Em seu terminal digite: <code>docker-compose up</code>, esse comando instala as imagens</li>
  <li>Depois que todos os processo estiverem ok, verifique se todos estão com STATUS Up com o comando: <code>docker ps -a</code></li>
  <li>Vamos configurar o mongo e para isso inicie ele com um dos dois comandos:</li>
  <ul>
    <li><code>docker exec -it mongo-tibs /bin/bash´´´</code></li>
    <li><code>docker exec -it mongo-tibs sh</code></li>
  </ul>
  <li>Em seguida: <code>mongosh --port 27017  --authenticationDatabase "admin" -u "root" -p</code></li>
  <ul>
    <li>Ele irá te pedir a senha: <strong>Tibs123!</strong> ( ela se encontra no docker-compose.yaml )</li>
  </ul>
  <li>Assim que acessar o Mongo digite: <code>use admin</code></li>
  <li>Em seguida: <code>db.createUser( { user: "tibs-api", pwd: "uhYLv#qMRE3ECp$N", roles: [ { role: "readWriteAnyDatabase", db: "admin" } ] } )</code></li>
  <li>Agora com muita <strong>ATENÇÃO</strong>, procure nos arquivos e comente:</li>
  <ul>
    <li>Se estiver no VSCODE, clique na lupinha de busca ou pressione <code>Ctrl + Shift + F</code></li>
    <li>Comente todas as linhas com: <code>authSource: this.options.common.mongodb.authSource,</code></li>
  </ul>
  <li>Agora vamos rodar o node: <code>npm run serve</code></li>
</ol>


