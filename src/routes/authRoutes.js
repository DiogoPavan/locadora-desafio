import { Router } from 'express';

import authMiddleware from '../middleware/authMiddleware';
import AuthController from '../controllers/AuthController';

const authRoute = Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/logoff', authMiddleware, AuthController.logoff);

export default authRoute;
