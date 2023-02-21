import { createPool } from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config';

let PORT;

if (typeof DB_PORT === 'string') {
  PORT = Number(DB_PORT);
} else {
  PORT = DB_PORT;
}

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: PORT,
  database: DB_DATABASE
});
