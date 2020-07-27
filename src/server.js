import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import './utils/Container';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
});
