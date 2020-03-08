'use strict';
module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    linkedinProfile: DataTypes.TEXT,
    githubProfile: DataTypes.STRING,
    website: DataTypes.STRING,
    skills: DataTypes.STRING,
    address: DataTypes.STRING,
    availability: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Developer.associate = function(models) {
    // associations can be defined here
  };
  return Developer;
};