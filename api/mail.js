const nodemailer = require('nodemailer');

const remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'smtp.gmail.com',    
    port: 587,
    secure: false,        
    auth:{
    user: 'fefohenriller@gmail.com',
    pass: 'fiap2021' }
    });
    
const emailASerEnviado = {
    from: 'fefohenriller@gmail.com',
    to: 'fefohenriller@gmail.com',
    subject: 'Enviando Email com Node.js',
    text: 'Estou te enviando este email com node.js'};

remetente.sendMail(emailASerEnviado, function(error){
 if (error) {
    console.log(error);
 } else {
    console.log('Email enviado com sucesso.');
 }});

 module.exports = {
    emailASerEnviado,
    consume
  }