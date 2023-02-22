// Importar el módulo Router desde express para crear un objeto router
import { Router } from 'express';

// Importar los controladores para las operaciones CRUD sobre las tareas
import {
  deleteTarea,
  getTarea,
  getTareas,
  postTarea,
  putTarea
} from '../controllers/tareas.controller';

// Importar el middleware para validar el esquema de una tarea antes de crear o actualizar una tarea
import { validationHandler } from '../utils/middlewares/validationHandler';

// Importar los esquemas de validación para la creación y actualización de una tarea
import { createTareaSchema, updateTareaSchema } from '../utils/schemas/tarea';

// Crear un objeto router
const router = Router();

// Definir la ruta para obtener todas las tareas
router.get('/', getTareas);

// Definir la ruta para obtener una tarea específica por su identificador único
router.get('/:id', getTarea);

// Definir la ruta para crear una tarea nueva, validando el esquema de la tarea con el middleware validationHandler
router.post('/', validationHandler(createTareaSchema), postTarea);

// Definir la ruta para actualizar una tarea existente por su identificador único, validando el esquema de la tarea con el middleware validationHandler
router.put('/:id', validationHandler(updateTareaSchema), putTarea);

// Definir la ruta para eliminar una tarea existente por su identificador único
router.delete('/:id', deleteTarea);

// Exportar el objeto router para que pueda ser utilizado en otras partes de la aplicación
export default router;
