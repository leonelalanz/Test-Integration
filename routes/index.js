var express = require('express');
var router = express.Router();

const admisionController = require('../controllers').admision;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Admision CRUD */
router.get('/api/admision', admisionController.list);
router.post('/api/admision', admisionController.add);

module.exports = router;