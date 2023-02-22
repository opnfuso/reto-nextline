import { Request, Response } from 'express';
import {
  createTarea,
  deleteTareaById,
  getAllTareas,
  getTareaById,
  updateTarea
} from '../services/tareas.service';

// Este es un controlador para la ruta '/tareas', el cual responde a una petición GET.
// La función getTareas se encarga de obtener todas las tareas de un usuario, a través de su id.

export const getTareas = async (req: Request, res: Response) => {
  // Se obtiene el token de autorización de la petición.
  const auth = req.headers.authorization;

  let response;

  // Si existe el token de autorización, se extrae el id del usuario y se obtienen todas las tareas asociadas a ese id.
  if (auth) {
    const id = auth.split('Bearer')[1];
    response = await getAllTareas(+id);
  } else {
    // Si no hay token de autorización, se devuelve una respuesta con código de estado 404 (Not Found).
    return res.status(404).send();
  }

  // Si la respuesta no es null ni undefined, se devuelve una respuesta con código de estado 200 y se envía la respuesta.
  if (response !== null && typeof response !== 'undefined') {
    res.status(200);
    return res.send(response);
  }
  // Si la respuesta es undefined, se devuelve una respuesta con código de estado 404.
  else if (response === undefined) {
    res.status(404);
    return res.send();
  }
  // Si la respuesta es null, se devuelve una respuesta con código de estado 500 (Internal Server Error).
  else {
    res.status(500);
    return res.send();
  }
};

// Este es un controlador para la ruta '/tareas/:id', el cual responde a una petición GET.
// La función getTarea se encarga de obtener una tarea específica, a través de su id.

export const getTarea = async (req: Request, res: Response) => {
  // Se obtiene el token de autorización de la petición.
  const auth = req.headers.authorization;

  // Si no hay token de autorización, se devuelve una respuesta con código de estado 404 (Not Found).
  if (auth === undefined) {
    return res.status(404).send();
  }

  // Se obtiene el id de la tarea de la petición.
  const id = req.params.id;

  // Se obtiene la tarea correspondiente al id.
  const response = await getTareaById(+id);

  // Si la respuesta no es null ni undefined, se devuelve una respuesta con código de estado 200 y se envía la respuesta.
  if (response !== null && typeof response !== 'undefined') {
    res.status(200);
    return res.send(response);
  }
  // Si la respuesta es undefined, se devuelve una respuesta con código de estado 404.
  else if (response === undefined) {
    res.status(404);
    return res.send();
  }
  // Si la respuesta es null, se devuelve una respuesta con código de estado 500 (Internal Server Error).
  else {
    res.status(500);
    return res.send();
  }
};

// Este es un controlador para la ruta '/tareas', el cual responde a una petición POST.
// La función postTarea se encarga de crear una nueva tarea.

export const postTarea = async (req: Request, res: Response) => {
  // Se obtiene el token de autorización de la petición.
  const auth = req.headers.authorization;

  // Si no hay token de autorización, se devuelve una respuesta con código de estado 404 (Not Found).
  if (auth === undefined) {
    return res.status(404).send();
  }

  // Se obtiene el cuerpo de la petición, que contiene los datos de la nueva tarea.
  const body = req.body;

  // Se crea la tarea con los datos proporcionados en el cuerpo de la petición.
  const response = await createTarea(body);

  // Si la respuesta no es null ni undefined, se devuelve una respuesta con código de estado 200 y se envía la respuesta.
  if (response !== null && typeof response !== 'undefined') {
    res.status(200);
    return res.send(response);
  }
  // Si la respuesta es undefined, se devuelve una respuesta con código de estado 404.
  else if (response === undefined) {
    res.status(404);
    return res.send();
  }
  // Si la respuesta es null, se devuelve una respuesta con código de estado 500 (Internal Server Error).
  else {
    res.status(500);
    return res.send();
  }
};

// Este es un controlador para la ruta '/tareas/:id', el cual responde a una petición PUT.
// La función putTarea se encarga de actualizar una tarea existente con los datos proporcionados en el cuerpo de la petición.

export const putTarea = async (req: Request, res: Response) => {
  // Se obtiene el token de autorización de la petición.
  const auth = req.headers.authorization;

  // Si no hay token de autorización, se devuelve una respuesta con código de estado 404 (Not Found).
  if (auth === undefined) {
    return res.status(404).send();
  }

  // Se obtiene el cuerpo de la petición, que contiene los datos actualizados de la tarea.
  const body = req.body;

  // Se obtiene el id de la tarea a actualizar.
  const id = req.params.id;

  // Se actualiza la tarea con los datos proporcionados en el cuerpo de la petición y el id correspondiente.
  const response = await updateTarea(body, +id);

  // Si la respuesta no es null ni undefined, se devuelve una respuesta con código de estado 200 y se envía la respuesta.
  if (response !== null && typeof response !== 'undefined') {
    res.status(200);
    return res.send(response);
  }
  // Si la respuesta es undefined, se devuelve una respuesta con código de estado 404.
  else if (response === undefined) {
    res.status(404);
    return res.send();
  }
  // Si la respuesta es null, se devuelve una respuesta con código de estado 500 (Internal Server Error).
  else {
    res.status(500);
    return res.send();
  }
};

// Este es un controlador para la ruta '/tareas/:id', el cual responde a una petición DELETE.
// La función delete se encarga de eliminar una tarea existente con los con el id proporcionado en la ruta de la petición.
export const deleteTarea = async (req: Request, res: Response) => {
  // Verificar si hay un token de autorización en los headers
  const auth = req.headers.authorization;

  if (auth === undefined) {
    // Si no hay token de autorización, devolver un error 404
    return res.status(404).send();
  }

  // Obtener el ID de la tarea de los parámetros de la solicitud
  const id = req.params.id;

  // Llamar a la función deleteTareaById para eliminar la tarea
  const response = await deleteTareaById(+id);

  if (response !== null && typeof response !== 'undefined') {
    // Si la respuesta es válida, devolver un estado 200 y una respuesta vacía
    res.status(200);
    return res.send();
  } else if (response === undefined) {
    // Si la respuesta es indefinida, devolver un error 404
    res.status(404);
    return res.send();
  } else {
    // Si hay un error en el servidor, devolver un error 500
    res.status(500);
    return res.send();
  }
};
