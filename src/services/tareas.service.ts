import { pool } from '../db';
import { Tarea, TareaParaEnviar } from '../interfaces/tareas';
import { getTagsByTareaId } from './tags.service';
import { getUsuarioById } from './usuarios.service';

export async function getAllTareas(): Promise<
  TareaParaEnviar[] | null | undefined
> {
  try {
    const [rows] = await pool.query<Tarea[]>('SELECT * FROM tareas', []);

    if (rows.length === 0) {
      return undefined;
    }

    let tareas: TareaParaEnviar[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      let tarea: TareaParaEnviar = {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        // El operador ternario determina si el buffer obtenido de la BD es 0 y si es 0 completado es falso y si no es 0 completado es true
        completado: row.completado.toString() === '0' ? false : true,
        fecha_entrega: row.fecha_entrega.toLocaleDateString(),
        creador: {
          id: 0,
          nombre: ''
        }
      };

      const creador = await getUsuarioById(row.creador);

      if (creador === null) {
        throw Error('Error obteniendo el usuario');
      }

      tarea.creador = creador;

      if (row.responsable) {
        const responsable = await getUsuarioById(row.responsable);

        if (responsable) {
          tarea.responsable = responsable;
        }
      }

      const tags = await getTagsByTareaId(row.id);

      if (tags) {
        tarea.tags = tags;
      }

      tareas.push(tarea);
    }

    return tareas;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTareaById(
  id: number
): Promise<TareaParaEnviar | null | undefined> {
  try {
    const [rows] = await pool.query<Tarea[]>(
      'SELECT * FROM tareas WHERE id = ?',
      id
    );

    if (rows.length === 0) {
      return undefined;
    }

    const row = rows[0];

    let tarea: TareaParaEnviar = {
      id: row.id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      // El operador ternario determina si el buffer obtenido de la BD es 0 y si es 0 completado es falso y si no es 0 completado es true
      completado: row.completado.toString() === '0' ? false : true,
      fecha_entrega: row.fecha_entrega.toLocaleDateString(),
      creador: {
        id: 0,
        nombre: ''
      }
    };

    const creador = await getUsuarioById(row.creador);

    if (creador === null) {
      throw Error('Error obteniendo el usuario');
    }

    tarea.creador = creador;

    if (row.responsable) {
      const responsable = await getUsuarioById(row.responsable);

      if (responsable) {
        tarea.responsable = responsable;
      }
    }

    const tags = await getTagsByTareaId(row.id);

    if (tags) {
      tarea.tags = tags;
    }

    return tarea;
  } catch (error) {
    console.error(error);
    return null;
  }
}
