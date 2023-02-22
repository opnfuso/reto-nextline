import { RowDataPacket } from 'mysql2';
import { Tag } from './tags';

// Define una tarea almacenada en la base de datos
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

// Define la forma de una tarea modificada
export interface TareaModificada {
  id: number;
  titulo: string;
  descripcion: string;
  completado: boolean;
  fecha_entrega: Date;
  comentarios?: string;
  responsable?: number;
  creador: number;
}

// Define la forma de un usuario
export interface Usuario {
  id: number;
  nombre: string;
}

// Define la forma de una tarea para enviar como respuesta
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

// Define la forma de los datos necesarios para crear una nueva tarea
export interface CrearTarea {
  titulo: string;
  descripcion: string;
  completado?: boolean;
  fecha_entrega: Date;
  comentarios?: string;
  responsable?: number;
  creador: number;
}

// Define la forma de los datos necesarios para editar una tarea existente
export interface EditarTarea {
  titulo?: string;
  descripcion?: string;
  completado?: boolean;
  fecha_entrega?: Date;
  comentarios?: string;
  responsable?: number;
  creador?: number;
}
