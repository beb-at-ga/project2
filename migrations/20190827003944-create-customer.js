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
    return queryInterface.dropTable('customers');
  }
};