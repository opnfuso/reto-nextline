import { Router } from 'express';
import { getTareas } from '../controllers/tareas.controller';

const router = Router();

router.get('/', getTareas);

export default router;
