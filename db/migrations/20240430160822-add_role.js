'use strict';

const { USER_TABLE }=require('./../models/user.model');

const { DataTypes }=require('sequelize');

const role={
  allow: false,
  type: DataTypes.STRING,
  defaultValue:'customer'
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColum(USER_TABLE, 'role');
  }
};
