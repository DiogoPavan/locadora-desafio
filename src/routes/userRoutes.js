import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Container from 'typedi';

import userSchema from '../schemas/userSchema';
import joiConfig from '../config/joiConfig';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = Container.get(UserController);

userRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: userSchema,
    },
    joiConfig
  ),
  userController.insert.bind(userController)
);

export default userRoutes;
