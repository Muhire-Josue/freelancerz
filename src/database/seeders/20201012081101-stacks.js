module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Stacks', [
    {
      tech: 'Spring',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Java',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Express',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Node',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Rails',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Ruby',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Rails',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Django',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Python',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'DotNet',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'C Sharp',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'React',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'JavaScript',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Vue',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Angular',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Android',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Swift',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tech: 'Object C',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Stacks', null, {})
};
