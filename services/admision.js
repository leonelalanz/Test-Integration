/**
 * Importacion de paquetes Request, SHA-1
 */
const bodyParser = require('body-parser');
 const request = require("request-promise");
var sha1 = require('sha1');
module.exports = function(app){
    app.get('/admision', function (req, res) {
        request({
            uri: "http://jsonplaceholder.typicode.com/albums",
            json: true, 
        }).then(albums => {
            albums.forEach(album => {
                album.hash = sha1(album.title);
            });
            res.send(albums);

        });
      });
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.post('/admision', function (req, res) {
        if(!req.body.nombre || !req.body.apellido || !req.body.correo) {
         respuesta = {
          error: true,
          codigo: 502,
          mensaje: 'El campo nombre, apellido y correo son requeridos'
         };
        } else {
          usuario = {
           nombre: req.body.nombre,
           apellido: req.body.apellido,
           correo : req.body.correo
          };
          respuesta = {
           status: true,
           codigo: 200,
           mensaje: 'Usuario creado',
           data: usuario
          };
        };
        res.send(respuesta);
       });
}