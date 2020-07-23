import { Router } from 'express';

import AuthRoutes from './authRoutes';
import UserRoutes from './userRoutes';
import FilmeRoutes from './filmeRoutes';

const routes = Router();

routes.use('/auth', AuthRoutes);
routes.use('/users', UserRoutes);
routes.use('/filmes', FilmeRoutes);

export default routes;
