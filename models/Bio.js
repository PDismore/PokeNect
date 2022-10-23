const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Bio extends Model {}

Bio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    about_me: {
      type: DataTypes.STRING(255),
    },
    fav_pokemon: {
      type: DataTypes.STRING(20),
    },
    fav_game: {
      type: DataTypes.STRING(20),
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "bio",
  }
);

module.exports = Bio;
