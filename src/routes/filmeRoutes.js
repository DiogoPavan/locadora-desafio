import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import FilmeController from '../controllers/FilmeController';
import filmeSchema from '../schemas/filmeSchema';
import joiConfig from '../config/joiConfig';

const filmeRoutes = Router();

filmeRoutes.get('/', FilmeController.findAll);

filmeRoutes.post(
  '/alugar',
  celebrate(
    {
      [Segments.BODY]: filmeSchema,
    },
    joiConfig
  ),
  FilmeController.alugar
);

filmeRoutes.post(
  '/devolver',
  celebrate(
    {
      [Segments.BODY]: filmeSchema,
    },
    joiConfig
  ),
  FilmeController.devolver
);

export default filmeRoutes;
