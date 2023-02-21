import { Router } from 'express';
import { getTarea, getTareas } from '../controllers/tareas.controller';

const router = Router();

router.get('/', getTareas);

router.get('/:id', getTarea);

export default router;
