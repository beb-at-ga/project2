'use strict';
module.exports = (sequelize, DataTypes) => {
  const routeCombo = sequelize.define('routeCombo', {
    routeId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    departingTerminalId: DataTypes.INTEGER,
    departingTerminalName: DataTypes.STRING,
    arrivingTerminalId: DataTypes.INTEGER,
    arrivingTerminalName: DataTypes.STRING
  }, {});
  routeCombo.associate = function(models) {
    // associations can be defined here
  };
  return routeCombo;
};