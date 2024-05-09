'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');


const ProductSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNUll: false,
    type: DataTypes.INTEGER,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model:CUSTOMER_TABLE,
      key:'id'
    },
    onUpdate: 'CASCADE',
    onDelete:'SET NULL'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

const CategorySchema = {
  id: {
    allowNUll: false,
    autoIncrement: true,
    primaryKey: true,
    type:DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull:false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
