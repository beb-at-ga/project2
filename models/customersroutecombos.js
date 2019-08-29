'use strict';
module.exports = (sequelize, DataTypes) => {
  const customersRouteCombos = sequelize.define('customersRouteCombos', {
    customerId: DataTypes.INTEGER,
    routeComboId: DataTypes.INTEGER
  }, {});
  customersRouteCombos.associate = function(models) {
    // associations can be defined here
  };
  return customersRouteCombos;
};