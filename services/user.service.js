const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const { hasPassword }=require('./../helper/passwordHas.helper');
class UserService {

  constructor() { }

  async find() {
    const users = await models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound("No se encontro el usuario");
    }
    return user;
    }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email }
    });
    return user;
  }

  async created(data) {
    data.password = await hasPassword(data.password);
    const newUseer = await models.User.create(data);
    delete newUseer.dataValues.password;
    return newUseer;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    const updateUser = await user.update(data);
    return updateUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return user;
  }
}

module.exports = UserService;
