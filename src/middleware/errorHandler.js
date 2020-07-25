import status from 'http-status';

export default async function errorHandler(error, req, res, next) {
  return res
    .status(error.statusCode || status.INTERNAL_SERVER_ERROR)
    .json({ message: error.message || 'Houve um erro no servidor' });
}
