const mysql = require('mysql');
const properties = require('properties')

module.exports = {
  query: (query, callback) => {
    let opts = { path: true }
    properties.parse ("database.properties", opts, (error, obj) => {
      if (error) return console.error (error);
      let connection = mysql.createConnection( obj );
      connection.connect();
      connection.query(query, callback)
      connection.end()
    });
  }
}