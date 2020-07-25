import status from 'http-status';

import { isCelebrate } from 'celebrate';

export default function errorHandlerMiddleware(error, req, res, next) {
  if (isCelebrate(error)) {
    return res.status(status.BAD_REQUEST).json({ errors: error.joi.details });
  }
  return res
    .status(error.statusCode || status.INTERNAL_SERVER_ERROR)
    .json({ message: error.message || 'Houve um erro no servidor' });
}
