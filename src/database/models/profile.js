module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    yearsOfExperience: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
    html_url: DataTypes.STRING,
    bio: DataTypes.STRING,
    public_repos: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Profile.associate = (models) => {
    // associations can be defined here
    Profile.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Profile;
};
