import { Joi } from 'celebrate';

const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default authSchema;
