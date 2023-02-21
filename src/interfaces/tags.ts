import { RowDataPacket } from 'mysql2';

export interface Tag extends RowDataPacket {
  id: number;
  titulo: string;
}
