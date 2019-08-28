'use strict';
module.exports = (sequelize, DataTypes) => {
  const watchedRoute = sequelize.define('watchedRoute', {
    customerId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER,
    departingTerminalId: DataTypes.INTEGER,
    arrivingTerminalId: DataTypes.INTEGER
  }, {});
  watchedRoute.associate = function(models) {
    // associations can be defined here
    models.watchedRoute.belongsTo(models.customer);
  };
  return watchedRoute;
};