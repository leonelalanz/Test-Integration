/*AUTOR: LEONELA LANZ*/


//VARIABLES GLOBALES
const express  = require('express');
const router = express.Router();

//Middleware
const axios = require('axios');
const sha1 = require('sha1');

/* METHOD GET */

router.get('/', (req, res) => {

    // Debe obtener los datos de albunes que yacen en formato JSON
    axios.get('https://jsonplaceholder.typicode.com/albums')
    .then(
        (data) => {
    //debe agregar un atributo llamado hash que sea el resultado de aplicarle el algoritmo de SHA1 al campo title
            let response = 
                data.data.map(
                    item => ({...item, hash: sha1(item.title) })
                );
            

        
            res.status(200).json(response);
        }
    )
    .catch((err) => {
        
        res.status(500).json(err);
        console.log(err);
    })    

});

module.exports = router;