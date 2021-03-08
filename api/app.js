const express = require('express');
const cors = require('cors');
const app = express();
const mail =  require('./mail.js');

const port = 3000;
let items = [];
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(items);
});
app.post('/', (req, res) => {
    items.push(req.body);
    res.send('Drone Adicionado com Sucesso!');
});

app.listen(port, () => {
    console.log('Controle de Drones');
});

mail.remetente.sendMail(emailASerEnviado, function(error){
 if (error) {
    console.log(error);
  } else {
    console.log('Email enviado com sucesso.');
  }});