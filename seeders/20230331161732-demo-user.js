'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('users', [{
    //   email: 'test@gmail.com',
    //   firstName: 'testFirstName',
    //   lastName: 'testLastName',
    //   password: 'password',
    //   createdAt: '04/23/22 04:34:22 +0000',
    //   updatedAt: '04/23/22 04:34:22 +0000'
    // }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
