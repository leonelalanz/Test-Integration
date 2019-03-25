const express = require('express')
const axios = require('axios')
const sha1 = require('sha1')

const myslConecction = require('./mysqlConnection')
const router = express.Router();

const getRouteHandler = (req, res) => {
  axios.get('http://jsonplaceholder.typicode.com/albums')
    .then( data => {
      let response = data.data.map(item => ({...item, hash: sha1(item.title) }))
      res.send(response)
    })
    .catch( err => {
      res.status(500).send('Error')
    })
}

const postRouteHandler = (req, res) => {
  let {nombre, apellido, correo} = req.body
  let sqlQuery = `INSERT INTO persona (nombre, apellido, correo) VALUES ('${nombre}', '${apellido}', '${correo}')`
  myslConecction.query( sqlQuery, (error, results, fields) => {
    if(!error) res.status(500).send(error)
    res.send(results)
  })
}

router.route('/admision')
  .get( getRouteHandler )
  .post( postRouteHandler )

module.exports = router;