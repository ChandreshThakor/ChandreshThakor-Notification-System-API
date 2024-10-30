'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'John01',
        password: 'Doe',
        createdAt: new Date(),
        updatedAt:new Date(),
        
      },
      { 
        username: 'abc01',
        password: 'Doe',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
