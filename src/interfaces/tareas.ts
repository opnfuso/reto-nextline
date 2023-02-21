import { RowDataPacket } from 'mysql2';

export interface TareaConInformacion extends RowDataPacket {
  tarea_id: number;
  tarea_titulo: string;
  tarea_descripcion: string;
  tarea_completado: Buffer;
  tarea_entrega: Date;
  tarea_comentarios: string;
  usuario_responsable_id?: number;
  usuario_responsable_nombre?: string;
  usuario_creador_id: number;
  usuario_creador_nombre: string;
  tags_id?: number;
  tags_nombre?: string;
}

export interface Responsable {
  id?: number;
  nombre?: string;
}

export interface Creador {
  id: number;
  nombre: string;
}

export interface Tag {
  id?: number;
  titulo?: string;
}

export interface TareaParaEnviar {
  id: number;
  titulo: string;
  descripcion: string;
  completado: boolean;
  fecha_entrega: string;
  comentarios?: string;
  responsable?: Responsable;
  creador: Creador;
  tags?: Tag[];
}
