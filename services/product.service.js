const Boom = require('@hapi/boom');

const { models }=require('./../libs/sequelize');
class ProductsService {

  constructor() {
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const option = { include: ["category"] };
    const { limit = 2, offset = 0, price } = query;
    option.limit = limit;
    option.offset = offset;
    option.where = (price) ? { price: price } : {};
    const products = await models.Product.findAll(option);
    return products;
  }


  async findOne(id) {
    try {
      const product =await models.Product.findByPk(id, {
        include: ["category"]
      });
      if (!product) {
        throw Boom.notFound("Product not found");
      }
      return product
    } catch (error) {
      throw error;
    }
  }

  async update(id,changes) {
    const product = await this.findOne(id);
    const upProduct = await product.update(changes);
    return upProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return product;
  }

}

module.exports=ProductsService;
