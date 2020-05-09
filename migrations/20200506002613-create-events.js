'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      attendances: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      location:{
        allowNull: false,
        type:Sequelize.STRING
      },
      willYouAttend: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};