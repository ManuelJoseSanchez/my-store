const { Model, DataTypes,Sequelize }=require('sequelize');

const { CUSTOMER_TABLE }=require('./customer.model');

const PRODUCT_TABLE = "products";


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

class Product extends Model {

  static associate(models) {
    this.belongsTo(models.Category, {
      as:'category'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    };
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product
}

