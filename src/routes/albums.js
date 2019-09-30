const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');
const rp = require('request-promise');
const sha1 = require('sha1');

router.get('/', function (req, res) {

        var options = {
                method: 'GET',
                uri: 'http://jsonplaceholder.typicode.com/albums',
                json: true,
        };

        rp(options)
                .then(albums =>{
                        albums.forEach(album => {
                                album.hash = sha1(album.title);
                        });
                        res.json(albums); 
                })
                .catch(function (error) {
                        console.log(error);
                });
});

module.exports = router;