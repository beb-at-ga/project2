'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.addColumn(
      'watchedJourneys',
      'departingTime',
     Sequelize.STRING
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('departingTime column not removed from customers table.')
  }
};

