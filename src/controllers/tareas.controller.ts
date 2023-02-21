import { Request, Response } from 'express';
import { getAllTareas } from '../services/tareas.service';

export const getTareas = async (_req: Request, res: Response) => {
  const response = await getAllTareas();

  if (response !== null) {
    res.status(200);
    return res.send(response);
  } else if (response === undefined) {
    return res.status(404);
  } else {
    return res.status(500);
  }
};

export const getTarea = async (_req: Request, res: Response) => {
  return res.send('Tarea');
};
