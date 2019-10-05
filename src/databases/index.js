const mysql = require('mysql');
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(path.resolve(__dirname,'../properties/database.properties')); 

const connection = mysql.createConnection({
    host: properties.get('Host'),
    port: properties.get('Port'),
    user: properties.get('Username'),
    password: properties.get('Password'),
    database: properties.get('Name')
});

connection.connect(function(error){
    if(error){
        console.log("Error en la conexion a la base de datos");
        return;
    }else{
        console.log("Conexion a la base de datos creada");
    }
});

module.exports = connection;