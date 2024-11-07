import { RowDataPacket } from 'mysql2';

export interface RekamMedis {
    no_rekamMedis: string;
    id_pasien: string;
    tanggal_mrs: Date;
    tanggal_krs: Date;
    nama_rumahSakit: string;
    keluhan: string;
    diagnosa: string;
    penanganan_medis: string;
    hasil_pemeriksaan: string;
    catatan: string;
    nama_dokter: string;
    tindakan: string;
    pelayanan: string;
    obat: string;
    rujukan: string;
}

export interface RekamMedisQueryResult extends RowDataPacket {
    no_rekamMedis: string;
    id_pasien: string;
    tanggal_mrs: Date;
    tanggal_krs: Date;
    nama_rumahSakit: string;
    keluhan: string;
    diagnosa: string;
    penanganan_medis: string;
    hasil_pemeriksaan: string;
    catatan: string;
    nama_dokter: string;
    tindakan: string;
    pelayanan: string;
    obat: string;
    rujukan: string;
}