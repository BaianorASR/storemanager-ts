import 'dotenv/config';

import express from 'express';

import { indexRoute } from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(indexRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log('🚀 Server started on port', Number(process.env.PORT));
});
