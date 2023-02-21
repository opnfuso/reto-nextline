import express from 'express';
const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import { PORT } from './config';
import tareasRoutes from './routes/tareas.routes';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware que transforma la req.body en JSON
app.use(express.json());

// Rutas
app.use('/tareas', tareasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
