const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() { }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(userId) {
    const option = {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        "items"
      ]
    };
    const orders = await models.Order.findAll(option);
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include:['user']
        },
        "items"
      ]
    });
    if (!order) {
      throw boom.notFound("Order is not found");
    }
    return order;
  }

  async update(id, order) {
    const upOrder = await this.findOne(id);
    return await upOrder.update(order);
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        "$customer.user.id$": userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        "items"
      ]
    });
    return orders;
  }

}


module.exports = OrderService;
