import express from 'express';
export const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import cors from 'cors';

import { PORT } from './config';
import tareasRoutes from './routes/tareas.routes';
import helmet from 'helmet';

// CORS
app.use(cors);

// Helmet
app.use(helmet());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware que transforma la req.body en JSON
app.use(express.json());

// Rutas
app.use('/tareas', tareasRoutes);

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
