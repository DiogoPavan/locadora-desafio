import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
});
