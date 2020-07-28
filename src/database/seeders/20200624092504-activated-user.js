
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    password: '$2b$10$rSdgPZk2Us/HAZi7Wqf/Hev7YYTVsqoO0Dy76dFeJm2xe8Ohho9M2',
    phoneNumber: '0785505790',
    status: 'active',
    userTypeId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'client@example.com',
    password: '$2b$10$rSdgPZk2Us/HAZi7Wqf/Hev7YYTVsqoO0Dy76dFeJm2xe8Ohho9M2',
    phoneNumber: '0785505790',
    status: 'active',
    userTypeId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
