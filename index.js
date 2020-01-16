/*VARIABLES GLOBALES*/
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

const getAdmisionRoute = require('./routes/getAdmision');
const postAdmisionRoute = require('./routes/postAdmision');

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use('/admision',getAdmisionRoute); //GET REQUEST
app.use('/admision',postAdmisionRoute); //POST REQUEST


//Listen Server
app.listen( port, () => {
    console.log('Server running on port', port);
  });