/**
 * Importacion de paquetes Request, SHA-1
 */

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
}