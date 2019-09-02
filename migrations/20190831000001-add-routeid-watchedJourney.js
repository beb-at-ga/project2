'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'watchedJourneys',
      'RouteID',
     Sequelize.INTEGER
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('RouteID column not removed from customers table.')
  }
};

