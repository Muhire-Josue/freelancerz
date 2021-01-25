module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UserTypes', [
    {
      type: 'Developer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'Client',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserTypes', null, {})
};
