'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (!/^[a-zA-Z\s]*$/.test(value))
            throw new Error("firstName only letters of the alphabet");
        },
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (!/^[a-zA-Z\s]*$/.test(value))
            throw new Error("lastName only letters of the alphabet");
        },
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 16],
        notEmpty: true
      }
    },
    gender: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};