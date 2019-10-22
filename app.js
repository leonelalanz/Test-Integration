/**
 * REST-API Adminsion
 * @author Miguelange Medina
 * @copyright Synergy-GB
 */

 /*Global Variables*/
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

/*Middlewares*/
const bodyParser = require('body-parser');


/*Import routes */
const getAdmisionRoute = require('./routes/getAdmision');
const postAdmisionRoute = require('./routes/postAdmision');

//BEGIN
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use('/admision',getAdmisionRoute); //GET REQUEST
app.use('/admision',postAdmisionRoute); //POST REQUEST



//Listen Server
app.listen( port, () => {
    console.log('Server running on port', port);
  });