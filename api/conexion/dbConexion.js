const propertiesReader = require('properties-reader');
const mysql = require('mysql');
const props = propertiesReader(`${__dirname}/database.properties`)

let conexion = mysql.createConnection({
    host:props.get('Host'),
    database:props.get('db'),
    port:props.get('Port'),
    user:props.get('Username'),
    password:props.get('Password')

})

/* ECONNREFUSED (Connection refused): No connection could be made because the target machine actively 
refused it. This usually results from trying to connect to a service that is inactive on the foreign host.
 no puedo conectarme a la base de datos para terminar con el examen :(*/
conexion.connect((err) => {
    if (err) {
        throw err;
        console.log(err);
        
    } 
    console.log("Conectado!");
  });


  module.exports = {
      conexion
  }