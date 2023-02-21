import { Request, Response } from 'express';
import {
  createTarea,
  getAllTareas,
  getTareaById
} from '../services/tareas.service';

export const getTareas = async (req: Request, res: Response) => {
  // Obtener el id por medio del Bearer token
  const auth = req.headers.authorization;

  let response;

  if (auth) {
    const id = auth.split('Bearer')[1];
    response = await getAllTareas(+id);
  } else {
    return res.status(404).send();
  }

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
  const auth = req.headers.authorization;

  if (auth === undefined) {
    return res.status(404).send();
  }

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

export const postTarea = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;

  if (auth === undefined) {
    return res.status(404).send();
  }

  const body = req.body;

  const response = await createTarea(body);

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
