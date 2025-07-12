import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // só obrigatório no cadastro
  majorId: Joi.string().required()});