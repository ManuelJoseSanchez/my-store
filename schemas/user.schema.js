const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email().min(3).max(150);
const password = Joi.string().min(8);

const createdUserSchema = Joi.object({
  email: email.required(),
  password:password.required()
});

const updateUserSchema = Joi.object({
  email: email,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required()
});


module.exports = {
  createdUserSchema,
  updateUserSchema,
  getUserSchema
}

