'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.addColumn(
      'watchedJourneys',
      'departingTerminalId',
     Sequelize.INTEGER
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('departingTerminalId column not removed from customers table.')
  }
};

