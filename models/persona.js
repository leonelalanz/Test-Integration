'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('Persona', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  });
  Persona.associate = function(models) {
    // associations can be defined here
  };
  Persona.removeAttribute('id');
  return Persona;
};