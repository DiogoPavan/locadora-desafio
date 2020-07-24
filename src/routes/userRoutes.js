import { Router } from 'express';

import UserController from '../controllers/UserController';

const userRoutes = Router();

userRoutes.post('/', UserController.insert);

export default userRoutes;
