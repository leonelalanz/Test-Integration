/*AUTOR: LEONELA LANZ*/


//VARIABLES GLOBALES
const express  = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database')
const { check, validationResult } = require('express-validator');

/*POST*/

router.post('/',
    [
        check('nombre','Name cannot be empty').not().isEmpty(),
        check('apellido','Last Name cannot be empty').not().isEmpty(),
        check('correo','Invalid email').isEmail(),
    ],
    (req, res)=>{
        let {nombre, apellido, correo} = req.body //Parametros en BODY

        const err = validationResult(req); //Validación de Parametros

        if (!err.isEmpty()) {
            return res.status(422).json({ errors: err.array() })
        }else{
       
             
            mysqlConnection.connect((err) => {
                if(err){
                   
                    console.error('Error connecting: ' + err.stack);
                    return;
                }
                console.log('MySQl Connection is OPEN');
            });

           
            let sql = `CALL addUser(?,?,?)`; 
            mysqlConnection.query( 
                sql,[nombre,apellido,correo],
                (err, results, fields) => {
                    if(err) res.status(500).send(err) 
                    res.status(200).send(results)
                });

      
           
            mysqlConnection.end((err) => {
                if(err){
                    
                    console.error('Error closing Database: ' + err.stack);
                    return;
                }
                console.log('MySQL Conecction is CLOSED');
            });
            
            
        }
    });

module.exports = router;