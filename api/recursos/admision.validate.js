/* middleware de admision */
const Joi = require('@hapi/joi');

const bluePrintAdmision = Joi.object().keys({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    correo: Joi.string().email()
});

const admisionValidada = (req, res, next) => {
    const resultadoValidado = Joi.validate(req.body, bluePrintAdmision, { abortEarly: false, convert: false })

    if (resultadoValidado.error != null) {
        res.status(400).send(resultadoValidado.error.details)
        return
    }
    next();

}

module.exports = admisionValidada;