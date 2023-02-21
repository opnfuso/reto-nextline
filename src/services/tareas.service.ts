import { pool } from '../db';
import {
  Responsable,
  Tag,
  TareaConInformacion,
  TareaParaEnviar
} from '../interfaces/tareas';

export async function getAllTareas(): Promise<
  TareaParaEnviar | null | undefined
> {
  try {
    const [rows] = await pool.query<TareaConInformacion[]>(
      "SELECT tareas.id AS 'tarea_id', tareas.titulo AS 'tarea_titulo', tareas.descripcion AS 'tarea_descripcion', tareas.completado AS 'tarea_completado', tareas.fecha_entrega AS 'tarea_entrega', tareas.comentarios AS 'tarea_comentarios', u.id AS 'usuario_responsable_id', u.nombre AS 'usuario_responsable_nombre', usuarios.id AS 'usuario_creador_id', usuarios.nombre AS 'usuario_creador_nombre', tags.id AS 'tags_id', tags.titulo AS 'tags_nombre' FROM tareas INNER JOIN tareas_tags ON tareas_tags.id_tarea = tareas.id INNER JOIN tags ON tareas_tags.id_tag = tags.id INNER JOIN usuarios ON tareas.creador = usuarios.id INNER JOIN usuarios u ON tareas.responsable = u.id",
      []
    );

    if (rows.length === 0) {
      return undefined;
    }

    let tags: Tag[] = [];

    rows.forEach((row) => {
      tags.push({
        id: row.tags_id,
        titulo: row.tags_nombre
      });
    });

    let responsable: Responsable = {};

    if (rows[0].usuario_responsable_id && rows[0].usuario_responsable_nombre) {
      responsable = {
        id: rows[0].usuario_responsable_id,
        nombre: rows[0].usuario_responsable_nombre
      };
    }

    let response: TareaParaEnviar = {
      id: rows[0].tarea_id,
      titulo: rows[0].tarea_titulo,
      descripcion: rows[0].tarea_descripcion,
      // El operador ternario determina si el buffer obtenido de la BD es 0 y si es 0 completado es falso y si no es 0 completado es true
      completado: rows[0].tarea_completado.toString() === '0' ? false : true,
      fecha_entrega: rows[0].tarea_entrega.toLocaleDateString(),
      comentarios: rows[0].tarea_comentarios,
      responsable: responsable,
      creador: {
        id: rows[0].usuario_creador_id,
        nombre: rows[0].usuario_creador_nombre
      },
      tags: tags
    };

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
