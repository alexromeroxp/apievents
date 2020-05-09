'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    description: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    date: {
      type: DataTypes.DATE,
      notEmpty: true
    },
    image: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    attendances:{
      type: DataTypes.INTEGER,
      notEmpty: true
    },
    willYouAttend: {
      type: DataTypes.BOOLEAN,
      notEmpty: true
    },
    location:{
      type: DataTypes.STRING,
      notEmpty: true
    }

  }, {});
  Events.associate = function(models) {
    // associations can be defined here
  };
  return Events;
};