const mysql = require('mysql');
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(path.resolve(__dirname,'database.properties')); 

var dbHost = properties.get('Host');
var dbPort = properties.get('Port');
var dbUsername = properties.get('Username');
var dbPassword = properties.get('Password');
var dbName = properties.get('Name');

const mysqlConnection = mysql.createConnection({
    host: dbHost,
    user: dbUsername,
    password: dbPassword,
    database: dbName,
    port: dbPort
});

mysqlConnection.connect(function(error){
    if(error){
        console.log("DB is not conected");
        console.log(error);
        return;
    }else{
        console.log("DB conected");
    }
});

module.exports = mysqlConnection;