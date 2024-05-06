const { extend } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

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

class Category extends Model{

  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey:'category_id'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps:false
    }
  }

}

module.exports = {
  CATEGORY_TABLE,
  CategorySchema,
  Category,
}
