import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
});
