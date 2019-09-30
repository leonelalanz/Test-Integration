const { Router } = require('express');
const router = new Router();
const bodyParser = require('body-parser');
const mysqlConnection = require('../database/database');
const { check, validationResult } = require('express-validator');

router.use(bodyParser.json());

router.post('/',[
    check('nombre','Nombre invalido').not().isEmpty(),
    check('apellido','Apellido invalido').not().isEmpty(),
    check('correo','Correo invalido').isEmail(),
],
function  (req,res) {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }else{
        console.log("Datos correctos");
        const sql = 'INSERT INTO persona (nombre,apellido,correo) VALUES (?,?,?)';

        mysqlConnection.query(sql, [nombre,apellido,correo], (error,rows,fields) => {
            if(!error){
                res.json(rows);
            }else{
                console.log(error);
            }
        });
    }
    
});

module.exports = router;