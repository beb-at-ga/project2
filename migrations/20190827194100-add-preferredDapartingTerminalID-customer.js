'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.addColumn(
      'customers',
      'preferredDepartingTerminalID',
     Sequelize.INTEGER
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('preferredDepartingTerminalID column not removed from customers table.')
  }
};

