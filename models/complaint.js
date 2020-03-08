'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    clientId: DataTypes.INTEGER,
    developerId: DataTypes.INTEGER
  }, {});
  Complaint.associate = function(models) {
    // associations can be defined here
  };
  return Complaint;
};