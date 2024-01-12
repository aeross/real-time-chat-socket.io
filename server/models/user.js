'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
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
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { 
        notNull: { msg: "username is required" },
        notEmpty: { msg: "username is required" }
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { 
        notNull: { msg: "password is required" },
        notEmpty: { msg: "password is required" }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(inst => {
    inst.password = hashPassword(inst.password);
  })
  return User;
};