module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'Admin',
      lastName: 'Doe',
      email: 'admin@example.com',
      password: '$2b$10$rSdgPZk2Us/HAZi7Wqf/Hev7YYTVsqoO0Dy76dFeJm2xe8Ohho9M2',
      phoneNumber: '0785505790',
      linkedIn: 'No linkedIn',
      githubUsername: 'No GitHub',
      status: 'active',
      userTypeId: 3,
      stackId: 'No Stack',
      getEmailNotification: true,

      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})

};
