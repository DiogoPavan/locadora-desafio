import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
});
