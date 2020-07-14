module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('JobApplications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    jobId: {
      type: Sequelize.INTEGER
    },
    applicantId: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('JobApplications')
};
