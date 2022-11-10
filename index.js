const express = require('express');
const router = require('./app/routers/index');
const app = express();

app.use(express.json());

app.use('/', router);
app.use(express.static('public'));

// Definimos el puerto en el que va a correr la API, 6969 pa los panas c;
const PORT = 6969;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:6969`)
  })