const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const axios = require('axios');
const crypto = require('crypto');

// GET admision service
router.get('/', (req, res) => {

    // GET ALL THE DATA FROM THE ALBUMS
    axios.get('https://jsonplaceholder.typicode.com/albums')
    .then(
        (json) => {
            // CREATE A DATA STORE
            let albums = [];
            
            // APPLY THE SHA1 ALGORITHM TO THE TITLE KEY OF EACH OBJECT AND PUSH IT
            json.data.map((album) => {
                let hash = crypto.createHash('sha1');
                hash.update(album.title);
                album.hash = hash.digest('hex');
                albums.push(album)
            });

            // SEND THE RESPONSE
            res.json(albums);
        }
    )
    .catch((err) => {
        res.send("<h2>Can't connect to the server</h2>");
        console.log(err);
    })    

});

//POST admision service
router.post('/', (req, res) => {
    const sql = 'INSERT INTO persona SET ?';
    const persona = {
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        correo : req.body.correo
    }
    connection.query(sql, [persona], (err, result) => {
        if(err){
            res.send('<h2>An error occurred connecting to the database</h2>');
            throw err;           
        }else{
            console.log(result);
            res.send(`<h2>Person object added successfully<h2>
                    <br>
                    <h4>${req.body.nombre}</h4>
                    <br>
                    <h4>${req.body.apellido}</h4>
                    <br>
                    <h4>${req.body.correo}</h4>`);
        }
    });
});

// OPTIONAL SERVICE TEST
router.get('/test', (req, res) => {

    const sql = 'SELECT * FROM persona';
    connection.query(sql, (err, results) => {
        if(err) {
            res.send('<h2>An error occurred connecting to the database</h2>');
            throw err;
        }
        else{
            res.json(results);
        }
    });

});


module.exports = router;