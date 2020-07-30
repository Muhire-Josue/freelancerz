module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    yearsOfExperience: DataTypes.STRING,
    jobType: DataTypes.STRING,
    status: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    stackId: DataTypes.STRING
  }, {});
  Job.associate = (models) => {
    // associations can be defined here
    Job.belongsTo(models.Users, {
      as: 'jobOwner',
      foreignKey: 'clientId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Job.belongsTo(models.Stack, {
      as: 'requiredTech',
      foreignKey: 'stackId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Job.hasMany(models.JobApplications, {
      as: 'job',
      foreignKey: 'jobId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Job;
};
