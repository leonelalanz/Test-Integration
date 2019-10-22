/**
 * Data Base connection class
 * 
 */

 // MySQL Variable
const mysql = require('mysql');
// DB's Properties
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(path.resolve(__dirname,'database.properties')); 

// DB conecction variable (MySQL Conecction)
const mysqlConnection = mysql.createConnection({
    host    : properties.get('Host'),
    user    : properties.get('Username'),
    password: properties.get('Password'),
    database: properties.get('Name'),
    port    : properties.get('Port')
});



module.exports = mysqlConnection;