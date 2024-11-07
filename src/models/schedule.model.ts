import { RowDataPacket } from 'mysql2';

export interface Schedule {
  id_jadwal: number;
  id_pemeriksaan: number;
  id_petugas: number;
  id_dokter: number;
  waktu_mulai: Date;
  waktu_selesai: Date;
  ruangan: string;
  status_jadwal: string;
}

export interface ScheduleQueryResult extends RowDataPacket {
  id_jadwal: number;
  id_pemeriksaan: number;
  id_petugas: number;
  id_dokter: number;
  waktu_mulai: Date;
  waktu_selesai: Date;
  ruangan: string;
  status_jadwal: string;
}
