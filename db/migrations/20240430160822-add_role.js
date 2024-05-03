'use strict';

const { USER_TABLE, UserSchema }=require('./../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColum(USER_TABLE, 'role');
  }
};
