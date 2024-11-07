import { RowDataPacket } from 'mysql2';

export interface Layanan {
  id_layanan: number;
  nama_layanan: string;
  biaya_layanan: number;
}

export interface LayananQueryResult extends RowDataPacket {
  id_layanan: number;
  nama_layanan: string;
  biaya_layanan: number;
}