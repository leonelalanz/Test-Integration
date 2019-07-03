const propertiesReader = require('properties-reader');
const mysql = require('mysql');
const props = propertiesReader(`${__dirname}/database.properties`)

let conexion = mysql.createConnection({
    host:props.get('Host'),
    user:props.get('Username'),
    password:props.get('Password'),
    database:props.get('Database'),
    port:props.get('Port')

})



conexion.connect((err) => {
    if (err) {
        throw err;
        console.log(err);
        
    } 
    console.log("db Conectado!");
  });


  module.exports = {
      conexion
  }