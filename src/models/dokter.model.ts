import { RowDataPacket } from 'mysql2';

enum JenisKelamin {
  pria = 'Laki - Laki',
  wanita = 'Perempuan'
}

export interface Dokter{
    id_dokter: string;
    nama: string;
    email: string;
    jenis_kelamin: JenisKelamin;
    no_hp: string;
    tanggal_lahir: Date;
    alamat: string;
    npi: string;
    spesialisasi: string;
    tanggal_lisensi: Date;
}

export interface DokterQueryResult extends RowDataPacket {
    id_dokter: string;
    nama: string;
    email: string;
    jenis_kelamin: JenisKelamin;
    no_hp: string;
    tanggal_lahir: Date;
    alamat: string;
    npi: string;
    spesialisasi: string;
    tanggal_lisensi: Date;
}