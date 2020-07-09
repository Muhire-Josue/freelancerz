module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Jobs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    yearsOfExperience: {
      type: Sequelize.STRING
    },
    jobType: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    description: {
      type: Sequelize.STRING
    },
    clientId: {
      type: Sequelize.INTEGER
    },
    stackId: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Jobs')
};
