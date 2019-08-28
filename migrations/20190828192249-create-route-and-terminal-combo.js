'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('routeCombos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      departingTerminalId: {
        type: Sequelize.INTEGER
      },
      departingTerminalName: {
        type: Sequelize.STRING
      },
      arrivingTerminalId: {
        type: Sequelize.INTEGER
      },
      arrivingTerminalName: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('routeCombos');
  }
};