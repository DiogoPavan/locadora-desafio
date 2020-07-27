import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Container from 'typedi';

import authMiddleware from '../middleware/authMiddleware';
import authSchema from '../schemas/authSchema';
import joiConfig from '../config/joiConfig';
import AuthController from '../controllers/AuthController';

const authRoute = Router();
const authController = Container.get(AuthController);

authRoute.post(
  '/login',
  celebrate(
    {
      [Segments.BODY]: authSchema,
    },
    joiConfig
  ),
  authController.login.bind(authController)
);

authRoute.post('/logoff', authMiddleware, authController.logoff.bind(authController));

export default authRoute;
