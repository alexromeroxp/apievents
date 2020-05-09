'use strict';
module.exports = (sequelize, DataTypes) => {
  const eventAssists = sequelize.define('eventAssists', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  eventAssists.associate = function(models) {
    // associations can be defined here
  };
  return eventAssists;
};