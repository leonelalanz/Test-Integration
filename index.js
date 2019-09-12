const express= require('express');
const app = express();
const request= require('request');
const bodyParser  = require('body-parser');
const sha1= require('sha1');

const conection = require('./database.properties');

var url="http://jsonplaceholder.typicode.com/albums";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/admision", (req, res) => {

    request({
        url: url,
        json: false
    }, function (error, response, body) {
 
        if (!error && response.statusCode === 200) {
            var result= JSON.parse(body);
            var data = [];
            for(var i=0;i<result.length;i++){
                data.push({
                    userId: result[i].userId,
                    id: result[i].id,
                    title: result[i].title,
                    hash: sha1(result[i].title)
                }); 
            }
            res.send(data) 
        }
    })

});

app.post("/admision", (req, res) => {

    conection.query('INSERT INTO persona SET ?', req.body, (error, result) => {
        if (error) throw error;
 
        res.status(201).send('Persona agregada exitosamente!');
    });

});




app.listen('8010', () => {
    console.log('listening on port 8010');
})