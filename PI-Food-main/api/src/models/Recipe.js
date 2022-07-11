const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
        //unique: true,
      },

      resume: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },

      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 100,
        },
      },
      stepByStep: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: false,
    }
  );
};
