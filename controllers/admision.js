const Persona = require('../models').Persona;

module.exports = {
    list(req, res) {
        const request = require('request'), url = 'http://jsonplaceholder.typicode.com/albums';
        return request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let urlResponse = JSON.parse(body);
                urlResponse = urlResponse.map(x => {
                    let sha1 = require('sha1');
                    x.hash = sha1(x.title);
                    return x;
                })
                console.log("Got a response: ", urlResponse);
                res.status(200).send(urlResponse);
            } else {
                console.log("Got an error: ", error, ", status code: ", response.statusCode);
                res.status(400).send(error);
            }
        });
    },

    add(req, res) {
        return Persona
            .create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
            })
            .then((persona) => res.status(201).send(persona))
            .catch((error) => res.status(400).send(error));
    },
};