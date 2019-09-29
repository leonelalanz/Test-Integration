const express = require("express");
const bodyParser = require('body-parser');
const app = express();

var request = require('request');
var sql = require('./database.properties');
var gatdata = require('./datas');
var sha1 = require('sha1');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let usuario = {
	nombre:'',
	apellido: '',
	correo: ''
};

let data = [];

let respuesta = {
};

app.get('/', function(req, res) {
	for(var d=0; d<gatdata.length; d++){
		data.push({
			userId: gatdata[d].userId,
			id: gatdata[d].id,
			title: gatdata[d].title,
			hash: sha1(gatdata[d].title)
		});
	}
	res.send(data);
});

app.post('/', function (req, res) {
	usuario = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		correo: req.body.correo
	};
	
	sql.query("INSERT INTO persona set ?", req.body, function (err, res) {});

	respuesta = {
		respuesta: "Exito registrando persona"
	};
	res.send(respuesta);
});

app.listen(3000, () => { 
	console.log('Datos console');
});