'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'customers',
      'mobilephone',
     Sequelize.STRING
    );
    
  },
  down: (queryInterface, Sequelize) => {
    console.log('mobilephone column not removed from customers table.')
  }
};

