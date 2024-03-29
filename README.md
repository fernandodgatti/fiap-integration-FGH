# Node + RabbitMQ

Controle simples de drone, feito com Vue.JS como base para o front-end, Node.js usado para desenvolvimento do micro-serviço e o RabbitMQ como sistema de mensageria.

## Instalação
 * É Necessário ter o RabbitMQ instalado em seu computador, segue o [link](https://www.rabbitmq.com/download.html) de referência
 * Instale o [Node.js](https://nodejs.org/en/), todas as dependências do projetos são baixados via NPM.


Abra a pasta **app** no terminal e execute o seguinte comando para baixar as dependências do front-end:
```bash
npm i 
```
Repita o mesmo processo na pasta **api**



## Configurar

Configure a conta de e-mail ultilizada para enviar os e-mails editando o arquivo **api/app.js**
```javascript
const remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',       // Insira o HOST
    service: 'smtp.gmail.com',    // SMTP
    port: 587,                    // Porta
    secure: false,        
    auth:{
        user: 'email@gmail.com', // Email
        pass: 'senha'            // Senha
    }
});
```
```javascript
const emailASerEnviado = {
    from: 'fefohenriller@gmail.com', // Emissor configurado anteriormente
    to: 'fefohenriller@gmail.com',   // Receptor
    suject: '',                      // Assunto
    text: '',                        // Mensagem a ser enviada
}
```

Configure o **HOST** da mensageria no arquivo **api/queue.js**
```javascript
function connect(){
  return require('amqplib').connect("amqp://localhost")
                           .then(conn => conn.createChannel());
}
```

## Executar o projeto

### Front-end
O projeto será executado em:
[http://localhost:8080](http://localhost:8080)

Use os seguintes comando dentro da pasta **app** para:

#### Ambiente de desenvolvimento
```
npm run serve
```

#### Build para produção
```
npm# run build
```

#### Lint 
```
npm run lint
```

##
### Back-end / Mensageria
Dentro da pasta **api** execute o comando:
```
node app.js
```
