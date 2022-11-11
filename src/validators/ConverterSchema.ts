import Joi from 'joi';

export const bodyValidator: Joi.ObjectPropertiesSchema = Joi.object({
  to: Joi.string().required(),
  from: Joi.string().required(),
  amount: Joi.number().required(),
});
