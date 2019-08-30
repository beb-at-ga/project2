'use strict';
module.exports = (sequelize, DataTypes) => {
  const watchedJourney = sequelize.define('watchedJourney', {
    customerId: DataTypes.INTEGER,
    journyId: DataTypes.INTEGER,
    departingTerminalId: DataTypes.INTEGER,
    departingTime: DataTypes.STRING
  }, {});
  watchedJourney.associate = function(models) {
    // associations can be defined here
    models.watchedJourney.belongsTo(models.customer);
  };
  return watchedJourney;
};