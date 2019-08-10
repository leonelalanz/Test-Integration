var mysql = require('mysql');
var lectura = require('fs-js');

var connection;
module.exports ={
    init : function(){
        lectura.open('./arch.txt', 'r', (err, fd) => {
            if (err) {
              if (err.code === 'ENOENT') {
                console.error('myfile does not exist');
                return;
              }
           
              throw err;
            }
           
            readMyData(fd);
          });
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'prueba_admision',
            port: 3306
         });
        connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            }
         });
     },
     close : function(){
        connection.end();
     },
     add : async function(info,oResponse){
        connection =  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'prueba_admision',
            port: 3306
         });
         connection.connect(function(error){
            if(error){
               return {
                  status: false,
                  codigo: 500 ,
                  mensaje: "error",
                  data: error
               };
            }else{
               console.log('Conexion correcta.');
            }
         });
        var sSQLCreate =  "INSERT INTO persona (nombre, apellido, correo) VALUES (";
        sSQLCreate += "'" + info.nombre + "', ";
        sSQLCreate += "'" + info.apellido + "', ";
        sSQLCreate += "'" + info.correo + "')";
         return new Promise( ( resolve, reject ) => {
            connection.query( sSQLCreate, function ( err, rows ,cols) {
                if ( err )
                    return reject( {
                       status: false,
                       codigo: 200,
                        mensaje: 'Usuario no creado',
                       data: err
                    });
                info.id = rows.insertId;
                resolve( {
                   status: true,
                   codigo: 200,
                   mensaje: 'Usuario creado',
                   data: info
                } );
            } );
           
        } );
     }

};
