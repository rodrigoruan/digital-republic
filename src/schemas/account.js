const Joi = require('joi');

const verifyAccountFields = Joi.object({
  name: Joi.string().min(2).required(),
  cpf: Joi.string()
    .length(11)
    .pattern(/^\d{11}$/)
    .required(),
  password: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required(),
});

module.exports = {
  verifyAccountFields,
};
