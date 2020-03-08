'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    jobId: DataTypes.INTEGER,
    developerId: DataTypes.INTEGER
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
  };
  return Application;
};