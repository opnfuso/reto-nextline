import express from 'express';
const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware que transforma la req.body en JSON
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('Alguien hizo ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
