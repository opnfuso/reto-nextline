import { RowDataPacket } from 'mysql2';
import { Tag } from './tags';

export interface Tarea extends RowDataPacket {
  id: number;
  titulo: string;
  descripcion: string;
  completado: Buffer;
  fecha_entrega: Date;
  comentarios?: string;
  responsable?: number;
  creador: number;
}

export interface TareaModificada {
  id: number;
  titulo: string;
  descripcion: string;
  completado: Boolean;
  fecha_entrega: Date;
  comentarios?: string;
  responsable?: number;
  creador: number;
}

export interface Usuario {
  id: number;
  nombre: string;
}

export interface TareaParaEnviar {
  id: number;
  titulo: string;
  descripcion: string;
  completado: boolean;
  fecha_entrega: string;
  comentarios?: string;
  responsable?: Usuario;
  creador: Usuario;
  tags?: Tag[];
}

export interface CrearTarea {
  titulo: string;
  descripcion: string;
  completado?: Boolean;
  fecha_entrega: Date;
  comentarios?: string;
  responsable?: number;
  creador: number;
}

export interface EditarTarea {
  titulo?: string;
  descripcion?: string;
  completado?: Boolean;
  fecha_entrega?: Date;
  comentarios?: string;
  responsable?: number;
  creador?: number;
}
