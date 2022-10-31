const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  verifyPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
  static follow(body, models) {
    return models.Follower.create({
      follower_id: body.follower_id,
      followed_id: body.followed_id
    })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    profile_pic: {
      type: DataTypes.STRING,
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
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
