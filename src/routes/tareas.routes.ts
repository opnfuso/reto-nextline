import { Router } from 'express';
import {
  getTarea,
  getTareas,
  postTarea
} from '../controllers/tareas.controller';
import { validationHandler } from '../utils/middlewares/validationHandler';
import { createTareaSchema } from '../utils/schemas/tarea';

const router = Router();

router.get('/', getTareas);

router.get('/:id', getTarea);

router.post('/', validationHandler(createTareaSchema), postTarea);

export default router;
