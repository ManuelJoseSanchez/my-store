const { faker } = require('@faker-js/faker');

const Boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit =  10;
    for (let i = 0; i < limit; i++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlPicsumPhotos(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }
  async findOne(id) {
    try {
      const product = this.products.find(item => item.id === id);
      if (!product) {
        throw Boom.notFound("Product not found");
      }
      if (product.isBlock) {
        throw Boom.conflict('product is block');
      }
      return product
    } catch (error) {
      throw error;
    }
  }

  async update(id,changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw Boom.notFound("Product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(items => items.id === id);
    if (index === -1) {
      throw Boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports=ProductsService;
