import { RowDataPacket } from 'mysql2';

export interface Admin {
  id_admin: number;
  nama_admin: string;
  email: string;
  password: string;
  telepon: string;
  request_token: string;
}

export interface AdminQueryResult extends RowDataPacket {
  id_admin: number;
  nama_admin: string;
  email: string;
  password: string;
  telepon: string;
  request_token: string;
}
