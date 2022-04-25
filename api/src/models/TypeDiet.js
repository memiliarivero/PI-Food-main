const{ DataTypes } = require ('sequelize');

//exportamos una fn que define el modelo
//luego inyectamos la conexion a sequalize
module.exports= (sequelize)=>{
  sequelize.define ('typeDiet',{
        name:{
          type: DataTypes.STRING,
          allowNull: false,
      }
  });
}