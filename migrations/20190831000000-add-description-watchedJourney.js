'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'watchedJourneys',
      'Description',
     Sequelize.STRING
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('Description column not removed from customers table.')
  }
};

