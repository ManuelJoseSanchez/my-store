const Joi = require('joi');

const categoryId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image:image.required(),
});

const updateCategorySchema = Joi.object({
  name: name,//🧛‍♀️
  image: image//🦹
});

const getCategorySchema = Joi.object({
  categoryId:categoryId.required()
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
}
