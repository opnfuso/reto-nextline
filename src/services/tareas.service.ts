import { pool } from '../db';
import {
  CrearTarea,
  Tarea,
  TareaModificada,
  TareaParaEnviar
} from '../interfaces/tareas';
import { getTagsByTareaId } from './tags.service';
import { getUsuarioById } from './usuarios.service';

/**
 * La función `getAllTareas` es una función asíncrona que utiliza una librería de base de datos para obtener un conjunto de tareas de la base de datos.
 *
 * @param id - El ID del usuario que creó las tareas que se van a buscar.
 * @returns Una promesa que se resuelve en un arreglo de objetos de tarea (`TareaParaEnviar`) o en `null` o `undefined` si no hay tareas.
 */
export async function getAllTareas(
  id: number
): Promise<TareaParaEnviar[] | null | undefined> {
  try {
    // Se utiliza la función `pool.query` para obtener todas las tareas que tienen el `id` del usuario dado como el creador de la tarea.
    const [rows] = await pool.query<Tarea[]>(
      'SELECT * FROM tareas WHERE creador = ?',
      id
    );

    // Si no hay tareas, se devuelve `undefined`.
    if (rows.length === 0) {
      return undefined;
    }

    // Se declara un arreglo vacío para almacenar las tareas que se van a enviar.
    let tareas: TareaParaEnviar[] = [];

    // Se utiliza un ciclo `for` para iterar sobre cada tarea que se encontró en la base de datos.
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Se crea un objeto `TareaParaEnviar` que va a contener la información que se va a enviar al cliente.
      let tarea: TareaParaEnviar = {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        // El operador ternario determina si el buffer obtenido de la BD es 0 y si es 0 completado es falso y si no es 0 completado es true
        completado: row.completado.toString() === '0' ? false : true,
        // La fecha se convierte del formato "Date" de TypeScript a un string con formato DD/MM/YYYY
        fecha_entrega: row.fecha_entrega.toLocaleDateString(),
        creador: {
          id: 0,
          nombre: ''
        }
      };

      // Se utiliza la función `getUsuarioById` para obtener el objeto de usuario que representa al creador de la tarea.
      const creador = await getUsuarioById(row.creador);

      // Si no se encontró el usuario, se lanza un error.
      if (creador === null) {
        throw Error('Error obteniendo el usuario');
      }

      // Se asigna el objeto de usuario obtenido como el creador de la tarea.
      tarea.creador = creador;

      // Si la tarea tiene un responsable asignado, se utiliza la función `getUsuarioById` para obtener el objeto de usuario que representa al responsable.
      if (row.responsable) {
        const responsable = await getUsuarioById(row.responsable);

        // Si se encontró el usuario responsable, se asigna como el responsable de la tarea.
        if (responsable) {
          tarea.responsable = responsable;
        }
      }

      // Se utiliza la función `getTagsByTareaId` para obtener un arreglo de etiquetas asociadas con la tarea.
      const tags = await getTagsByTareaId(row.id);

      // Si se encontraron etiquetas, se asignan a la tarea.
      if (tags) {
        tarea.tags = tags;
      }

      // Se agrega la tarea al arreglo de tareas que se van a enviar al cliente.
      tareas.push(tarea);
    }

    // Se devuelve el arreglo de tareas.
    return tareas;
  } catch (error) {
    // Si hay un error, lo muestra en la consola y devuelve null
    console.error(error);
    return null;
  }
}

/**
 * Esta es una función asíncrona que recibe un parámetro "id" de tipo número y devuelve una promesa que puede devolver una tarea, null o undefined y su función es obtener una tarea por medio de su "id"
 * @param id Identificador de la tarea a devolver
 * @returns Una promesa que puede devolver un objecto de tipo "TareaParaEnviar" null u undefined
 */
export async function getTareaById(
  id: number
): Promise<TareaParaEnviar | null | undefined> {
  try {
    // Hace una consulta a la base de datos con el id proporcionado y guarda los resultados en la variable "rows"
    const [rows] = await pool.query<Tarea[]>(
      'SELECT * FROM tareas WHERE id = ?',
      id
    );

    // Si no hay filas en la consulta, devuelve "undefined" para manejarlo en el controlador
    if (rows.length === 0) {
      return undefined;
    }

    // Si hay filas, se toma la primera fila y se almacena en la variable "row"
    const row = rows[0];

    // Se crea un objeto "tarea" con los campos correspondientes de la fila obtenida de la base de datos
    let tarea: TareaParaEnviar = {
      id: row.id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      // El operador ternario determina si el buffer obtenido de la BD es 0 y si es 0 completado es falso y si no es 0 completado es true
      completado: row.completado.toString() === '0' ? false : true,
      // La fecha se convierte del formato "Date" de TypeScript a un string con formato DD/MM/YYYY
      fecha_entrega: row.fecha_entrega.toLocaleDateString(),
      creador: {
        id: 0,
        nombre: ''
      }
    };

    // Obtiene el usuario que creó la tarea usando el campo "creador" de la fila obtenida de la base de datos
    const creador = await getUsuarioById(row.creador);

    // Si no se pudo obtener el creador, lanza un error
    if (creador === null) {
      throw Error('Error obteniendo el usuario');
    }

    // Se agrega el creador a la tarea
    tarea.creador = creador;

    // Si existe un responsable para la tarea, se obtiene el usuario responsable y se agrega a la tarea
    if (row.responsable) {
      const responsable = await getUsuarioById(row.responsable);

      if (responsable) {
        tarea.responsable = responsable;
      }
    }

    // Obtiene las etiquetas asociadas a la tarea y las agrega a la tarea si existen
    const tags = await getTagsByTareaId(row.id);

    if (tags) {
      tarea.tags = tags;
    }

    // Devuelve la tarea
    return tarea;
  } catch (error) {
    // Si hay un error, lo muestra en la consola y devuelve null
    console.error(error);
    return null;
  }
}

export async function createTarea(
  tarea: CrearTarea
): Promise<TareaModificada | null> {
  try {
    const [rows] = await pool.query<any>(
      'INSERT INTO tareas (titulo, descripcion, completado, fecha_entrega, comentarios, responsable, creador) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        tarea.titulo,
        tarea.descripcion,
        tarea.completado,
        tarea.fecha_entrega,
        tarea.comentarios,
        tarea.responsable,
        tarea.creador
      ]
    );

    if (rows.affectedRows >= 1) {
      return {
        id: rows.insertId,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        completado: tarea.completado ? tarea.completado : false,
        creador: tarea.creador,
        fecha_entrega: tarea.fecha_entrega,
        comentarios: tarea.comentarios,
        responsable: tarea.responsable
      };
    } else {
      return null;
    }

    return null;
  } catch (error) {
    // Si hay un error, lo muestra en la consola y devuelve null
    console.error(error);
    return null;
  }
}
