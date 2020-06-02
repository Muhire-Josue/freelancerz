module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    type: DataTypes.STRING
  }, {});
  UserType.associate = (models) => {
    // associations can be defined here
    UserType.hasMany(models.Users, {
      as: 'users',
      foreignKey: 'userTypeId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return UserType;
};
