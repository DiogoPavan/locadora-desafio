import { Router } from 'express';

import authMiddleware from '../middleware/authMiddleware';

import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import filmeRoutes from './filmeRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/filmes', authMiddleware, filmeRoutes);

export default routes;
