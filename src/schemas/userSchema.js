import { Joi } from 'celebrate';

const userSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default userSchema;
