import { RowDataPacket } from 'mysql2';

export interface InsertResponse extends RowDataPacket {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}
