const express = require('express');
const app = express();
const port = 3000;
let items = [];
app.use(express.json())
app.get('/', (req, res) => {
    res.json(items);
})
app.post('/', (req, res) => {
    items.push(req.body);
    res.send('Drone Adicionado com Sucesso!');
})
app.listen(port, () => {
    console.log('Controle de Drones');
})