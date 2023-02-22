// Importar el objeto pool desde el módulo db para conectarse a la base de datos
import { pool } from '../db';

// Importar la interfaz Tag que se utiliza como tipo de retorno en la función
import { Tag } from '../interfaces/tags';

// Definir la función asincrónica getTagsByTareaId que recibe como argumento el identificador único de una tarea y retorna una promesa que se resuelve en un arreglo de objetos Tag o en null en caso de que la tarea no tenga etiquetas asociadas
export async function getTagsByTareaId(id: number): Promise<Tag[] | null> {
  try {
    // Realizar una consulta a la base de datos para obtener los tags asociados a la tarea con el id proporcionado
    const [rows] = await pool.query<Tag[]>(
      'SELECT t.id, t.titulo FROM tags t INNER JOIN tareas_tags tt ON t.id = tt.id_tag INNER JOIN tareas t2 ON t2.id = tt.id_tarea WHERE t2.id = ?',
      id
    );

    // Verificar si no se encontraron registros en la consulta, en cuyo caso retornar null
    if (rows.length === 0) {
      return null;
    }

    // Retornar un arreglo de objetos Tag encontrados en la consulta
    return rows;
  } catch (error) {
    // Capturar y registrar cualquier error que ocurra durante la ejecución de la consulta
    console.error(error);
    throw Error('Error al obtener los tags');
  }
}
