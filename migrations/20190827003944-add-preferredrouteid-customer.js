'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'customers',
      'preferredrouteid',
     Sequelize.INTEGER
    );

  },
  down: (queryInterface, Sequelize) => {
    console.log('preferredroutid column not removed from customers table.')
  }
};

