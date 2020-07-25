import { Joi } from 'celebrate';

const filmeSchema = Joi.object({
  idFilme: Joi.number().required(),
});

export default filmeSchema;
