import { Request, Response } from 'express';
import { getAllTareas, getTareaById } from '../services/tareas.service';

export const getTareas = async (_req: Request, res: Response) => {
  const response = await getAllTareas();

  if (response !== null && typeof response !== 'undefined') {
    res.status(200);
    return res.send(response);
  } else if (response === undefined) {
    res.status(404);
    return res.send();
  } else {
    res.status(500);
    return res.send();
  }
};

export const getTarea = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await getTareaById(+id);

  console.log(response);

  if (response !== null && typeof response !== 'undefined') {
    res.status(200);
    return res.send(response);
  } else if (response === undefined) {
    res.status(404);
    return res.send();
  } else {
    res.status(500);
    return res.send();
  }
};
