'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'watchedJourneys',
      'TerminalID',
     Sequelize.INTEGER
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('TerminalID column not removed from customers table.')
  }
};

