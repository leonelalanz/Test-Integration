const express = require('express');
const admisionRouter = require('./api/recursos/admision');

let app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/admision', admisionRouter);












let portBase = 3001;

app.listen(portBase, () => {
    console.log(`escuchando de el puerto ${portBase}`);
    
})