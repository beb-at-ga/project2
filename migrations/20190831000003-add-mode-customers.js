'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'customers',
      'preferredTransportToTerminal',
     Sequelize.STRING
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('preferredTransportToTerminal column not removed from customers table.')
  }
};

