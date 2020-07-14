module.exports = (sequelize, DataTypes) => {
  const JobApplications = sequelize.define('JobApplications', {
    jobId: DataTypes.INTEGER,
    applicantId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {});
  JobApplications.associate = (models) => {
    // associations can be defined here
    JobApplications.belongsTo(models.Users, {
      as: 'users',
      foreignKey: 'applicantId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    JobApplications.belongsTo(models.Job, {
      as: 'job',
      foreignKey: 'jobId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return JobApplications;
};
