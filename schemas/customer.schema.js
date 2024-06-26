const Joi = require('joi');

const customerid = Joi.number().integer();
const name = Joi.string().min(6).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

const email = Joi.string().email();
const password = Joi.string();

const getCustomerSchema = Joi.object({
  customerid:customerid.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password:password.required()
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
}
