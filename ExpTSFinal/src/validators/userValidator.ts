import Joi from 'joi';

export const userSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  majorId: Joi.string().allow(null, '').optional()
});