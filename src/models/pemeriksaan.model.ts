import { RowDataPacket } from 'mysql2';

enum JenisPemeriksaan {
  laboratorium = 'Laboratorium',
  radiologi = 'Radiologi',
}

enum Prioritas {
  emergency = 'Emergency',
  urgent = 'Urgent',
  normal = 'Normal',
}

enum StatusPermintaan {
  pending = 'Pending',
  proses = 'Proses',
  selesai = 'Selesai',
}

export interface Pemeriksaan {
  id_pemeriksaan: number;
  id_pasien: number;
  id_dokter: number;
  id_spesimen?: number;
  id_layanan: number;
  jenis_pemeriksaan: JenisPemeriksaan;
  tanggal_permintaan: Date;
  prioritas: Prioritas;
  status_permintaan: StatusPermintaan;
  catatan_dokter?: string;
}

export interface PemeriksaanQueryResult extends RowDataPacket {
  id_pemeriksaan: number;
  id_pasien: number;
  id_dokter: number;
  id_spesimen?: number;
  id_layanan: number;
  jenis_pemeriksaan: string;
  tanggal_permintaan: Date;
  prioritas: string;
  status_permintaan: string;
  catatan_dokter?: string;
}