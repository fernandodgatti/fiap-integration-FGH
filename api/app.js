const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const queue = require('./queue.js');
const app = express();

const MAIL_HOST = process.env.MAIL_HOST
const MAIL_SERVICE = process.env.MAIL_SERVICE
const MAIL_PORT =  process.env.MAIL_PORT
const MAIL_AUTH_LOGIN =  process.env.MAIL_AUTH_LOGIN
const MAIL_AUTH_PASSWORD =  process.env.MAIL_AUTH_PASSWORD
const API_PORT =  process.env.API_PORT
const MAIL_CONSUMER = process.env.MAIL_CONSUMER

let items = [];
const remetente = nodemailer.createTransport({
    host: MAIL_HOST,
    service: MAIL_SERVICE,    
    port: MAIL_PORT,
    secure: false,        
    auth:{
        user: MAIL_AUTH_LOGIN,
        pass: MAIL_AUTH_PASSWORD 
    }
});   

 queue.consume("fila1", message => {
    //process the message
    const json = JSON.parse(message.content.toString());
    console.log("processing " + message.content.toString());
    console.log("Temperatura " + json.temperatura);
    console.log("umidade " + json.umidade);    
    const emailASerEnviado = {
        from: MAIL_AUTH_LOGIN,
        to: MAIL_CONSUMER,
        subject: 'Enviando Email com Node.js',
        text: `Drone ID: ${json.droneId} - Rastreamento: ${json.rastreamento} - Latitude: ${json.latitude} - Longitude: ${json.longitude} - Temperatura: ${json.temperatura}ºC - Umidade ${json.umidade}% - `
    };
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

app.get('/drone', (req, res) => {
    res.json(items);
});
app.post('/drone', (req, res) => {
    items.push(req.body);
    res.send('Drone Adicionado com Sucesso!');
    queue.sendToQueue("fila1", req.body);
});
app.delete('/drone', (req, res) => {
    items = items.filter(
        i => (i.droneId !== req.body.droneId)
    );
    res.send('Drone removido com sucesso!');
});
app.put('/drone', (req, res) => {
    var id = req.body.droneId;
    items = items.filter(
        i => (i.droneId !== id)
    );
    items.push(req.body);
    res.send('Drone alterado com sucesso!');
});
app.listen(API_PORT, () => {
    console.log('Controle de Drones');
});