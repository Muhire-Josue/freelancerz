module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    yearsOfExperience: {
      type: Sequelize.INTEGER
    },
    avatar_url: {
      type: Sequelize.STRING
    },
    html_url: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    public_repos: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Profiles')
};
