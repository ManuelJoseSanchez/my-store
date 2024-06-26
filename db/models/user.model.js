
const { Model,DataTypes,Sequelize }=require('sequelize');

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
  recoveryToken:{
    field:'recovery_token',
    allowNull:false,
    type:DataTypes.STRING
  },
  role: {
    allow: false,
    type: DataTypes.STRING,
    defaultValue:'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {

  static associate(models) {
    this.hasOne(models.Customer,{
      as: 'customer',
      foreignKey:"userId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {
  UserSchema,
  USER_TABLE,
  User
}
