const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {//resumen del plato
      type: DataTypes.STRING,
      allowNull: false
    },
    spoonacularScore:{ //puntuacion
      type: DataTypes.INTEGER
    },
    healthScore:{ //nivel de comida saludable
      type: DataTypes.INTEGER,
    },
    analyzedInstructions:{//paso a paso
      type: DataTypes.TEXT,
    },
    image:{
      type:DataTypes.STRING,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  });
};
