const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host     : 'db4free.net',
    user     : 'sql9144354',
    password : '7TW2ccREF1',
    database : 'prueba_admision'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;