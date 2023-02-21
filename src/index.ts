import express from 'express';
const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import { PORT } from './config';
import { pool } from './db';
import { TareaConInformacion } from './interfaces/tareas';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware que transforma la req.body en JSON
app.use(express.json());

app.get('/ping', async (_req, res) => {
  const [rows] = await pool.query<TareaConInformacion[]>(
    "SELECT tareas.id AS 'tarea_id', tareas.titulo AS 'tarea_titulo', tareas.descripcion AS 'tarea_descripcion', tareas.completado AS 'tarea_completado', tareas.fecha_entrega AS 'tarea_entrega', tareas.comentarios AS 'tarea_comentarios', u.id AS 'usuario_responsable_id', u.nombre AS 'usuario_responsable_nombre', usuarios.id AS 'usuario_creador_id', usuarios.nombre AS 'usuario_creador_nombre', tags.id AS 'tags_id', tags.titulo AS 'tags_nombre' FROM tareas INNER JOIN tareas_tags ON tareas_tags.id_tarea = tareas.id INNER JOIN tags ON tareas_tags.id_tag = tags.id INNER JOIN usuarios ON tareas.creador = usuarios.id INNER JOIN usuarios u ON tareas.responsable = u.id",
    []
  );

  console.log(rows);

  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
