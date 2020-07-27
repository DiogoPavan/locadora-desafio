import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Container from 'typedi';

import filmeSchema from '../schemas/filmeSchema';
import joiConfig from '../config/joiConfig';
import FilmeController from '../controllers/FilmeController';

const filmeRoutes = Router();
const filmeController = Container.get(FilmeController);

filmeRoutes.get('/', filmeController.findAll.bind(filmeController));

filmeRoutes.post(
  '/alugar',
  celebrate(
    {
      [Segments.BODY]: filmeSchema,
    },
    joiConfig
  ),
  filmeController.alugar.bind(filmeController)
);

filmeRoutes.post(
  '/devolver',
  celebrate(
    {
      [Segments.BODY]: filmeSchema,
    },
    joiConfig
  ),
  filmeController.devolver.bind(filmeController)
);

export default filmeRoutes;
