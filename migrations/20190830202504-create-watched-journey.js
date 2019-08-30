'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('watchedJourneys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      JourneyID: {
        type: Sequelize.INTEGER
      },
      ScheduleID: {
        type: Sequelize.INTEGER
      },
      SchedRouteID: {
        type: Sequelize.INTEGER
      },
      TerminalDescription: {
        type: Sequelize.STRING
      },
      DayOpDescription: {
        type: Sequelize.STRING
      },
      Time: {
        type: Sequelize.STRING
      },
      VesselName: {
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
    return queryInterface.dropTable('watchedJourneys');
  }
};