//VARIABLES MYSQL
const mysql = require('mysql');
//PROPIERTIES
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(path.resolve(__dirname,'database.properties')); 

//VARIABLES DE CONEXIÓN(MySQL Conecction)
const mysqlConnection = mysql.createConnection({
    host    : properties.get('Host'),
    user    : properties.get('Username'),
    password: properties.get('Password'),
    database: properties.get('Name'),
    port    : properties.get('Port')
});

module.exports = mysqlConnection;