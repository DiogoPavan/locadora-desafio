import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import UserModel from '../models/UserModel';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token não foi informado');
  }

  const [, token] = authHeader.split(' ');
  const user = await UserModel.findByToken(token);

  if (!user) {
    throw new Error('Token inválido! Não há usuário com o token informado');
  }

  try {
    const decoded = verify(token, authConfig.secret);

    req.idUserLogado = decoded.idUser;

    return next();
  } catch (error) {
    throw new Error('Token inválido! Gere outro token entrando novamente no sistema');
  }
}
