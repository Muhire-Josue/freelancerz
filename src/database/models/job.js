'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    price: DataTypes.NUMBER,
    yearsOfExperience: DataTypes.STRING,
    jobType: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    clientId: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};