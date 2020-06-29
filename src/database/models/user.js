module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    linkedIn: DataTypes.STRING,
    githubUsername: DataTypes.STRING,
    status: DataTypes.STRING,
    userTypeId: DataTypes.INTEGER
  }, {});
  Users.associate = (models) => {
    // associations can be defined here
    Users.belongsTo(models.UserType, {
      as: 'UserType',
      foreignKey: 'userTypeId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Users.hasMany(models.Job, {
      as: 'users',
      foreignKey: 'clientId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Users;
};
