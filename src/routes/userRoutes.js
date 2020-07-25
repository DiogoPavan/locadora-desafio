import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import UserController from '../controllers/UserController';
import userSchema from '../schemas/userSchema';
import joiConfig from '../config/joiConfig';

const userRoutes = Router();

userRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: userSchema,
    },
    joiConfig
  ),
  UserController.insert
);

export default userRoutes;
