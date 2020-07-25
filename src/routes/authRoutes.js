import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import authMiddleware from '../middleware/authMiddleware';
import AuthController from '../controllers/AuthController';
import authSchema from '../schemas/authSchema';
import joiConfig from '../config/joiConfig';

const authRoute = Router();

authRoute.post(
  '/login',
  celebrate(
    {
      [Segments.BODY]: authSchema,
    },
    joiConfig
  ),
  AuthController.login
);
authRoute.post('/logoff', authMiddleware, AuthController.logoff);

export default authRoute;
