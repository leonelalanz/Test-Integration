const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 80

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() )
app.use( routes );

app.listen( port, () => {
  console.log('Server running on port', port);
});