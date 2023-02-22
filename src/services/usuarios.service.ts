// Importar el objeto pool desde el módulo db para conectarse a la base de datos
import { pool } from '../db';

// Importar la interfaz Usuario que se utiliza como tipo de retorno en la función
import { Usuario } from '../interfaces/usuario';

// Definir la función asincrónica getUsuarioById que recibe como argumento el identificador único de un usuario y retorna una promesa que se resuelve en un objeto Usuario o en null en caso de que no se encuentre un usuario con el identificador proporcionado
export async function getUsuarioById(id: number): Promise<Usuario | null> {
  try {
    // Realizar una consulta a la base de datos para obtener los datos del usuario con el id proporcionado
    const [rows] = await pool.query<Usuario[]>(
      'SELECT * FROM usuarios WHERE id = ?',
      id
    );

    // Verificar si no se encontraron registros en la consulta, en cuyo caso retornar null
    if (rows.length === 0) {
      return null;
    }

    // Retornar el primer objeto Usuario encontrado en la consulta
    return rows[0];
  } catch (error) {
    // Capturar y registrar cualquier error que ocurra durante la ejecución de la consulta
    console.error(error);
    throw Error('Error al obtener los tags');
  }
}
