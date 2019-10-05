const { Router } = require('express');
const request = require("request");
const sha1= require('sha1');
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.resolve(__dirname,'../properties/service.properties'));
const router = Router();
const database = require('../databases/index.js');

var url = properties.get('URL');
var data = null;
var respuestaJson = null;
var persona = null;

//routes
router.get('/', function(req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Bienvenidos a Admision'
    };
    res.send(respuesta);
});


router.get('/admision', function (req, res) {
    request({
	    url: url,
	    json: false
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
            data = JSON.parse(body);
            respuestaJson = [];
            for(var i=0;i<data.length;i++){
                respuestaJson.push({
                    userId: data[i].userId,
                    id: data[i].id,
                    title: data[i].title,
                    hash: sha1(data[i].title)
                }); 
            }
            //console.log(respuestaJson);
            res.send(respuestaJson) 
	    }else{
            respuesta = {
                error: true,
                codigo: 500,
                mensaje: 'Error obteniendo los datos del servicio'
            };
            res.send(respuesta)   
        }
	})
});

router.post('/admision', function (req, res) {
    if(req.body.nombre != undefined && req.body.nombre != "" 
        && req.body.apellido != undefined && req.body.apellido != "" 
        && req.body.correo != undefined  && req.body.correo != ""){
        persona = {
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            correo : req.body.correo
        }
        database.query('INSERT INTO persona SET ?', persona, (error, result) => {
            if (error){
                respuesta = {
                    error: true,
                    codigo: 500,
                    mensaje: 'Error insertando los datos'
                };
                res.send(respuesta);
            }else{
                res.status(201).send('Datos agregados correctamente');
            }   
        });
    }else{
        respuesta = {
            error: true,
            codigo: 500,
            mensaje: 'Error en el envio de los datos requeridos por el servicio, por favor verifiquelos'
        };
        res.send(respuesta);
    }
});

module.exports = router;
