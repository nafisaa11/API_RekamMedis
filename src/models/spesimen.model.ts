import { RowDataPacket } from 'mysql2';

enum JenisSpesimen {
  darah = 'Darah',
  urin = 'Urin',
  tinja = 'Tinja',
  sputum = 'Sputum',
  lainnya = 'Lainnya',
}

enum StatusSpesimen {
  diterima = 'Diterima',
  diproses = 'Diproses',
  selesai = 'Selesai',
  rusak = 'Rusak',
  hilang = 'Hilang',
}

export interface Spesimen {
  id_spesimen: number;
  jenis_spesimen: JenisSpesimen;
  tanggal_pengambilan: Date;
  lokasi_pengambilan: string;
  tanggal_diterima: Date;
  status_spesimen: StatusSpesimen;
  catatan: string;
}

export interface SpesimenQueryResult extends RowDataPacket {
  id_spesimen: number;
  jenis_spesimen: string;
  tanggal_pengambilan: Date;
  lokasi_pengambilan: string;
  tanggal_diterima: Date;
  status_spesimen: string;
  catatan: string;
}