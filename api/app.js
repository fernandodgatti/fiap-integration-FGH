const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const queue = require('./queue.js');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

let items = [];
const remetente = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'fefohenriller@gmail.com',
    pass: 'fiap2021'
  }
});

queue.consume("fila1", message => {
  //process the message
  const json = JSON.parse(message.content.toString());
  console.log("processing " + message.content.toString());
  console.log("Temperatura " + json.temperatura);
  console.log("umidade " + json.umidade);
  const emailASerEnviado = {
    from: 'fefohenriller@gmail.com',
    to: 'fernandodgatti@gmail.com',
    subject: 'Enviando Email com Node.js',
    text: `Drone ID: ${json.droneId} - Rastreamento: ${json.rastreamento} - Latitude: ${json.latitude} - Longitude: ${json.longitude} - Temperatura: ${json.temperatura}ºC - Umidade ${json.umidade}% - `
  };
  if (json.temperatura <= 0 || json.temperatura >= 35 || json.umidade <= 15) {
    setTimeout(() => {
      remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado com sucesso.');
        }
      });
    }, 60000);
  }
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/drone', (req, res) => {
  res.json(items);
});

app.post('/drone', (req, res) => {
  var item = {
    droneId: req.body.droneId,
    rastreamento: req.body.rastreamento,
    temperatura: req.body.temperatura,
    umidade: req.body.umidade,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  }
  items.push(item);
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
  var item = {
    droneId: req.body.droneId,
    rastreamento: req.body.rastreamento,
    temperatura: req.body.temperatura,
    umidade: req.body.umidade,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  }
  var id = req.body.droneId;
  items = items.filter(
    i => (i.droneId !== id)
  );
  items.push(item);
  res.send('Drone alterado com sucesso!');
});
app.listen(3000, () => {
  console.log('Controle de Drones');
});
