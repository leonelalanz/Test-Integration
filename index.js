/**
 * Importacion de Express.js
 */
const express = require("express");
const app = express();
/**
 * Importacion de servicios
 */
require("./services/admision")(app);

app.listen(8081, () => {
    console.log("El servidor está inicializado en el puerto 8081");
   });

  