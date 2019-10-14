const request= require('request');
const http = require('http');
const sha1 = require('sha1');
const properties = require ("properties");
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('database.properties');
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();

function getAlbum(req,res)
{
	url= 'http://jsonplaceholder.typicode.com/albums';
	request({url: url, json: false}, function (error, response, body) {
         if (!error && response.statusCode === 200) {
            var respuesta= JSON.parse(body);
             for (var i = 0; i < respuesta.length; i++) {
		        titlehash=sha1(respuesta[i].title)
		        respuesta[i].hash=titlehash;
		    }
            res.send(respuesta); 
        }
    })
}
 
function saveData(req, res) {
    const { nombre, apellido, telefono } = req.body;
      connection.query('INSERT INTO persona SET nombre = "Yohanna", apellido= "Padrino", correo= "yohannapadrino93@gmail.com"',
        (err, result) => {
      res.redirect('/admision');
    });
}
exports.getAlbum=getAlbum;
exports.saveData=saveData;