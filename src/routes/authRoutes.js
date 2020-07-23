import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const authRoute = Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/logoff', AuthController.logoff);

export default authRoute;
