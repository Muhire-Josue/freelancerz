module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    password: '$2b$10$rSdgPZk2Us/HAZi7Wqf/Hev7YYTVsqoO0Dy76dFeJm2xe8Ohho9M2',
    phoneNumber: '0785505790',
    status: 'active',
    userTypeId: 1,
    stackId: '1,2,4',
    linkedIn: 'https://www.linkedin.com/in/muhire-josu%C3%A9-43930010a/',
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
    linkedIn: 'https://www.linkedin.com/in/muhire-josu%C3%A9-43930010a/',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
