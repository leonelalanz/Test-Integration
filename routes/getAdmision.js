//GLOBAL VARIABLES
const express  = require('express');
const router = express.Router();

//Middleware
const axios = require('axios');
const sha1 = require('sha1');

/**
 * GET Admision Service
 */
router.get('/', (req, res) => {

    // GET ALL DATA FROM https://jsonplaceholder.typicode.com/albums
    axios.get('https://jsonplaceholder.typicode.com/albums')
    .then(
        (data) => {
             //FOR EACH TITLE KEY OF ALBUM GENERATE SHA1
            let response = 
                data.data.map(
                    item => ({...item, hash: sha1(item.title) })
                );
            

            // SEND RESPONSE
            res.status(200).json(response);
        }
    )
    .catch((err) => {
        //THROW EXEPTION
        res.status(500).json(err);
        console.log(err);
    })    

});

module.exports = router;