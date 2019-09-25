const mysql = require('mysql');
const db = require('./database.properties.js');

const connection = mysql.createConnection({
    host    :   db.Host,
    port    :   db.Port,
    user    :   db.Username,
    password:   db.Password,
    database:   db.Database
});

connection.connect((err) => {
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connection with mysql established successfully');
});

module.exports = connection;
