const Joi = require('joi');

const email = Joi.string().email();
const token= Joi.string().alphanum();
const newPassword=Joi.string().min(8);
const recoverySchema = Joi.object({
  email:email.required()
});

const changePasswordSchema=Joi.object({
  token:token.required(),
  newPassword:newPassword.required()
});

module.exports = {
  recoverySchema,
  changePasswordSchema,
}
