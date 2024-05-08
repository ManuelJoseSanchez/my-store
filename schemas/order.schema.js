const Joi = require('joi');

const orderId = Joi.number().integer();
const customerId = Joi.number().integer();

const productId = Joi.number().integer();
const amount = Joi.number().integer();

const getOrderSchema = Joi.object({
  orderId:orderId.required()
})

const createOrderSchema = Joi.object({
  customerId:customerId.required()
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
}
