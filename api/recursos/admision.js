const express = require('express');
const axios = require('axios');
const _ = require('underscore');
const sha1 = require('sha1');
/* const {conexion} = require('./../conexion/dbConexion'); */

const admisionRouter = express.Router();


admisionRouter.get('/', async (req, res) => {
    let url = 'http://jsonplaceholder.typicode.com/albums';
    let peticion = await axios.get(url)
    let albums = await peticion.data

   let hashedTitle = _.each(albums,album =>{
      album.hash =  sha1(album.title);
      })

    res.status(200).json(hashedTitle)
    console.log("get adminsion");

})

admisionRouter.post('/', (req, res) => {
  /* console.log(conexion); */
  
})



module.exports = admisionRouter;