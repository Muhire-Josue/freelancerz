'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    clientId: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};