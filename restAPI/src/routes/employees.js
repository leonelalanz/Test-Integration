const express = require ('express');
const router = express.Router();
const fetch = require('node-fetch');
const BodyParser= require('body-parser');
const app = express();
const sha1 = require('sha1');

const mysqlConnection = require('../database');
//ruta consulta general
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM persona', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});
// ruta con nombre especifico
router.get('/:nombre', (req, res) => {
    const {nombre} = req.params;
    mysqlConnection.query('SELECT * FROM persona WHERE nombre = ?', [nombre], (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
});
});
//POST
router.post('/', (req, res) =>{
    const {nombre, apellido, correo} = req.body;
    mysqlConnection.query('INSERT INTO persona VALUE (?,?,?)', [nombre, apellido, correo], (err, rows, fields)=>{
        console.log(req.body);
        if(!err){
            res.json({Status: 'persona guardada'});
        } else {
            console.log(err);
        }
    });
});
//ruta Jsons Ejemplo y encriptacion
router.get('/http://jsonplaceholder.typicode.com/albums', (req, res) => {
    fetch('http://jsonplaceholder.typicode.com/albums')
.then(response => response.json())
.then(data =>{
    data.map(obj =>{
        obj.hash = sha1(obj.title )
    })
    console.log(data)
        res.json(data); 
})
})
module.exports = router;