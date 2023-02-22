import { Router } from 'express';
import {
  deleteTarea,
  getTarea,
  getTareas,
  postTarea,
  putTarea
} from '../controllers/tareas.controller';
import { validationHandler } from '../utils/middlewares/validationHandler';
import { createTareaSchema, updateTareaSchema } from '../utils/schemas/tarea';

const router = Router();

router.get('/', getTareas);

router.get('/:id', getTarea);

router.post('/', validationHandler(createTareaSchema), postTarea);

router.put('/:id', validationHandler(updateTareaSchema), putTarea);

router.delete('/:id', deleteTarea);

export default router;
