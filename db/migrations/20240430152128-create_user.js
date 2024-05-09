'use strict';

const { USER_TABLE, } = require('./../models/user.model');
const { DataTypes,Sequelize }=require('sequelize');

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique:true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
