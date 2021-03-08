const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const queue = require('./queue.js');
const app = express();


let items = [];
const remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'smtp.gmail.com',    
    port: 587,
    secure: false,        
    auth:{
        user: 'fefohenriller@gmail.com',
        pass: 'fiap2021' 
    }
});   
const emailASerEnviado = {
    from: 'fefohenriller@gmail.com',
    to: 'fefohenriller@gmail.com',
    subject: 'Enviando Email com Node.js',
    text: 'Abdala'
};


 queue.consume("fila1", message => {
    //process the message
    const json = JSON.parse(message.content.toString());
    console.log("processing " + message.content.toString());
    console.log("Temperatura " + json.temperatura);
    console.log("umidade " + json.umidade);    
    if (json.temperatura <= 0 || json.temperatura >= 35 || json.umidade <= 15) {
        setTimeout(() => {
            remetente.sendMail(emailASerEnviado, function(error){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado com sucesso.');
                }
            });
        }, 60000);        
    }
});


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(items);
});
app.post('/', (req, res) => {
    items.push(req.body);
    res.send('Drone Adicionado com Sucesso!');
    queue.sendToQueue("fila1", req.body);
});
app.listen(3000, () => {
    console.log('Controle de Drones');
});