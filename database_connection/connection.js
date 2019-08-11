/**
 * Importacion de módulos
 *    MySql
 *    FS
 */
var mysql = require('mysql');
var fs = require('fs');
var connection;

module.exports ={
  /**
   * Inicializacion de conexión con la DB
   * @param {*} infoDB 
   */
   init : function(infoDB){
      return new Promise((resolve,reject)=>{
         connection =  mysql.createConnection({
            host: infoDB[0],
            user: infoDB[2],
            password: infoDB[3],
            database: infoDB[4],
            port: infoDB[1]
         });
         connection.connect(function(error){
            if(error){
               reject( {
                  status: false,
                  codigo: 500 ,
                  mensaje: "error",
                  data: error
               });
            }else{
               resolve('Conexion correcta.');
            }
         });
      });
   },

   /**
   * Cierre de la conexión con la bd
   */
   close : function(){
      connection.end();
   },

   /**
   * Insert en la DB
   * @param {*} info 
   * @param {*} oResponse 
   */
   add : async function(info,oResponse){

      await this.getDBParameter().then(async (response)=>{
         infoDB = response;
         await this.init(response).then((response)=>{
            console.log(response);
         })
      },(err)=>{
         return{
            status: false,
            codigo: 500 ,
            mensaje: "error",
            data: error
         };
      });
      var sSQLCreate =  "INSERT INTO persona (nombre, apellido, correo) VALUES (";
      sSQLCreate += "'" + info.nombre + "', ";
      sSQLCreate += "'" + info.apellido + "', ";
      sSQLCreate += "'" + info.correo + "')";
      return new Promise( ( resolve, reject ) => {
         connection.query( sSQLCreate, function ( err, rows ,cols) {
            if ( err )
               reject( {
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
            });
         });
      });
   },
   /**
   * Parámetros de conexión con la DB 
   */
   getDBParameter: function(){
      return new Promise ((resolve,reject)=>{
         var infoDB=[];
         fs.readFile("./resources/database.properties","utf8",(err,list)=>{
            if(err){
               reject(err);
            }else{
               const lines = list.split("\n");
               lines.forEach(element => {
                  infoLine = element.split(" ");
                  infoDB.push(infoLine[1]);
               });
               resolve(infoDB);
            }
         });
      });
   }

};
