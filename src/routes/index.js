import { Router } from 'express';

import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import filmeRoutes from './filmeRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/filmes', filmeRoutes);

export default routes;
