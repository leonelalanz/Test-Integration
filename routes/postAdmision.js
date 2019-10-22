//GLOBAL VARIABLES
const express  = require('express');
const router = express.Router();


const mysqlConnection = require('../database/database')

//Middleware
const { check, validationResult } = require('express-validator');



/**
 * Post Admision service
*/
router.post('/',
    [
        check('nombre','Name cannot be empty').not().isEmpty(),
        check('apellido','Last Name cannot be empty').not().isEmpty(),
        check('correo','Invalid email').isEmail(),
    ],
    (req, res)=>{
        let {nombre, apellido, correo} = req.body //Params from body

        const err = validationResult(req); //Params validation

        if (!err.isEmpty()) {
            return res.status(422).json({ errors: err.array() })
        }else{
            //test
            // Open Data Base conecction
             
            mysqlConnection.connect((err) => {
                if(err){
                    console.error('Error connecting: ' + err.stack);
                    return;
                }
                console.log('MySQl Connection is OPEN');
            });
            //CALL addUser StoredProcedure
            let sql = `CALL addUser(?,?,?)`; 
            mysqlConnection.query( 
                sql,[nombre,apellido,correo], //Parameter
                (err, results, fields) => {
                if(err) res.status(500).send(err)
                res.status(200).send(results)
              })

            //Close Database Conecction
           
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