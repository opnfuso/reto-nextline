import { pool } from '../db';
import { Tag } from '../interfaces/tags';

export async function getTagsByTareaId(id: number): Promise<Tag[] | null> {
  try {
    const [rows] = await pool.query<Tag[]>(
      'SELECT t.id, t.titulo  FROM tags t INNER JOIN tareas_tags tt ON t.id = tt.id_tag  INNER JOIN tareas t2 ON t2.id = tt.id_tarea  WHERE t2.id = ?',
      id
    );

    if (rows.length === 0) {
      return null;
    }

    return rows;
  } catch (error) {
    console.error(error);
    throw Error('Error al obtener los tags');
  }
}
