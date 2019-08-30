'use strict';
module.exports = (sequelize, DataTypes) => {
  const watchedJourney = sequelize.define('watchedJourney', {
    customerId: DataTypes.INTEGER,
    JourneyID: DataTypes.INTEGER,
    ScheduleID: DataTypes.INTEGER,
    SchedRouteID: DataTypes.INTEGER,
    TerminalDescription: DataTypes.STRING,
    DayOpDescription: DataTypes.STRING,
    Time: DataTypes.STRING,
    VesselName: DataTypes.STRING
  }, {});
  watchedJourney.associate = function (models) {

    models.watchedJourney.belongsTo(models.customer);

  };
  return watchedJourney;
};