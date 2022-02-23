"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email must be inputted",
          },
          notNull: {
            msg: "Email must be inputted",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password must be inputted",
          },
          notNull: {
            msg: "Password must be inputted",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          let salt = bcrypt.genSaltSync(8);
          let hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};