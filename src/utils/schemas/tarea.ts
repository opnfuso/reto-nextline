import Joi from 'joi';
import { CrearTarea } from '../../interfaces/tareas';

export const createTareaSchema: Joi.ObjectSchema<CrearTarea> = Joi.object({
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  completado: Joi.boolean(),
  fecha_entrega: Joi.date().required(),
  comentarios: Joi.string(),
  responsable: Joi.number().positive().integer(),
  creador: Joi.number().positive().integer().required()
});

export const updateTareaSchema: Joi.ObjectSchema<CrearTarea> = Joi.object({
  titulo: Joi.string(),
  descripcion: Joi.string(),
  completado: Joi.boolean(),
  fecha_entrega: Joi.date(),
  comentarios: Joi.string(),
  responsable: Joi.number().positive().integer(),
  creador: Joi.number().positive().integer()
});
