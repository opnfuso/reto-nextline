import { RowDataPacket } from 'mysql2';

export interface TareaConInformacion extends RowDataPacket {
  tarea_id: number;
  tarea_titulo: string;
  tarea_descripcion: string;
  tarea_completado: Buffer;
  tarea_entrega: Date;
  tarea_comentarios: string;
  usuario_responsable_id: number;
  usuario_responsable_nombre: string;
  usuario_creador_id: number;
  usuario_creador_nombre: string;
  tags_id: number;
  tags_nombre: string;
}
