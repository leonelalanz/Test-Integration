const express = require('express');
const axios = require('axios');
const _ = require('underscore');
const sha1 = require('sha1');
const db = require('./../conexion/dbConexion').conexion;
const validateAdmision = require('./admision.validate');


const admisionRouter = express.Router();


admisionRouter.get('/', async (req, res) => {
	let url = 'http://jsonplaceholder.typicode.com/albums';
	let peticion = await axios.get(url)
	let albums = await peticion.data

	let hashedTitle = _.each(albums, album => {
		album.hash = sha1(album.title);
	})

	res.status(200).json(hashedTitle)
	console.log("get adminsion");

})

admisionRouter.post('/', validateAdmision, (req, res) => {

	let queryInsert = `INSERT INTO persona (nombre, apellido, correo) VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}')`;
	console.log(req);
	db.query(queryInsert, (err, resultado, fields) => {
		if (err) {
			res.status(400).send(err);
			console.log(err);
		}
		res.status(200).send(resultado);
	})
	db.end();
	

})



module.exports = admisionRouter;