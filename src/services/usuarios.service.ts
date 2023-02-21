import { pool } from '../db';
import { Usuario } from '../interfaces/usuario';

export async function getUsuarioById(id: number): Promise<Usuario | null> {
  try {
    const [rows] = await pool.query<Usuario[]>(
      'SELECT * FROM usuarios WHERE id = ?',
      id
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error(error);
    throw Error('Error al obtener los tags');
  }
}
