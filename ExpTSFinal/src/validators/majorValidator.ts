import Joi from 'joi';

export const majorSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  code: Joi.string().min(2).max(4).required(),
  description: Joi.string().allow('').optional()
});