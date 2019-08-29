'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'routeCombos',
      'scheduledRouteId',
     Sequelize.INTEGER
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('scheduledRouteId column not removed from customers table.')
  }
};

