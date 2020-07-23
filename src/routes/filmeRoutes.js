import { Router } from 'express';

import FilmeController from '../controllers/FilmeController';

const filmeRoutes = Router();

filmeRoutes.get('/', FilmeController.buscarFilmes);
filmeRoutes.post('/alugar', FilmeController.alugar);
filmeRoutes.post('/devolver', FilmeController.devolver);

export default filmeRoutes;
