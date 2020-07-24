import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Token não foi informado');
  }

  try {
    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.secret);

    req.idUserLogado = decoded.idUser;

    return next();
  } catch (error) {
    throw new Error('Token inválido! Gere outro token entrando novamente no sistema');
  }
}
