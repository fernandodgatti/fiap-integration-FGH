const express = require('express');
const cors = require('cors');
const app = express();

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
app.put('/:id', (req, res))
app.listen(port, () => {
    console.log('Controle de Drones');
});
