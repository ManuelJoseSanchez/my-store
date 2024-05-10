const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const { hasPassword }=require('./../helper/passwordHas.helper');
class CustomerService {

  constructor() { }

  async find() {
    const customers = await models.Customer.findAll({
      include:['user']
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id,{
      include: ['user']
    });
    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async created(customer) {
    customer.user.password = await hasPassword(customer.user.password);
    customer = await models.Customer.create(customer,{
      include: ['user']
    });
    delete customer.dataValues.user.password;
    return customer;
  }

  async update(customerId, customer) {
    const customers= await this.findOne(customerId);
    const costumerUp = await customers.update(customer);
    return costumerUp;
  }

  async delete(customerId) {
    const customer = this.findOne(customerId);
    await models.Customer.destroy();
    return customer;
  }
}

module.exports = CustomerService;
