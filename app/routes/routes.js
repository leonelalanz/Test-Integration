const functions= require('../../controllers/functions');
const dbConnection = require('../../config/dbConnection');


const request= require('request');
module.exports= app=>{
app.get('/admision', functions.getAlbum);
app.get('/admisionpost',functions.saveData);
}