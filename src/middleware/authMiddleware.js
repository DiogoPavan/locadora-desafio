import { verify } from 'jsonwebtoken';
import status from 'http-status';

import authConfig from '../config/auth';
import UserModel from '../models/UserModel';
import ApiError from '../utils/ApiError';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError('Token não foi informado', status.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');
  const user = await UserModel.findByToken(token);

  if (!user) {
    throw new ApiError('Token inválido! Não há usuário com o token informado', status.UNAUTHORIZED);
  }

  try {
    const decoded = verify(token, authConfig.secret);

    req.idUserLogado = decoded.idUser;

    return next();
  } catch (error) {
    throw new ApiError(
      'Token inválido! Gere outro token entrando novamente no sistema',
      status.UNAUTHORIZED
    );
  }
}
