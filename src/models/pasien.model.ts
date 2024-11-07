import { RowDataPacket } from 'mysql2';

enum JenisKelamin {
  pria = 'pria',
  wanita = 'wanita'
}

enum Agama {
  islam = 'islam',
  kristen = 'kristen',
  katolik = 'katolik',
  hindu = 'hindu',
  budha = 'budha',
  konghucu = 'konghucu',
  lainnya = 'lainnya'
}

enum Ras {
  white = 'white',
  black = 'black',
  asian = 'asian',
  indian = 'indian',
  chinese = 'chinese',
  lainnya = 'lainnya'
}

enum StatusPernikahan {
  single = 'single',
  married = 'married',
  divorced = 'divorced',
  widowed = 'widowed'
}

enum KelompokEtnis {
  hispanic = 'hispanic',
  non_hispanic = 'non_hispanic',
  lainnya = 'lainnya'
}

enum StatusPasien {
  dead = 'dead',
  alive = 'alive',
  unknown = 'unknown'
}

export interface Pasien {
  id_pasien: string;
  id_eksternal: string;
  nama_lengkap: string;
  nama_panggilan: string;
  nama_ibu: string;
  jenis_kelamin: JenisKelamin;
  tempat_lahir: string;
  tanggal_lahir: Date;
  agama: Agama;
  ras: Ras;
  alamat: string;
  kode_negara: string;
  no_telp: string;
  bahasa_utama: string;
  status_pernikahan: StatusPernikahan;
  no_rekening: string;
  no_sim: string;
  kelompok_etnis: KelompokEtnis;
  kelahiran_kembar: boolean;
  jumlah_kembar: number;
  kewarganegaraan: string;
  indikator_meninggal: StatusPasien;
  tanggal_meninggal: Date;
}

export interface PasienQueryResult extends RowDataPacket {
  id_pasien: string;
  id_eksternal: string;
  nama_lengkap: string;
  nama_panggilan: string;
  nama_ibu: string;
  jenis_kelamin: JenisKelamin;
  tempat_lahir: string;
  tanggal_lahir: Date;
  agama: Agama;
  ras: Ras;
  alamat: string;
  kode_negara: string;
  no_telp: string;
  bahasa_utama: string;
  status_pernikahan: StatusPernikahan;
  no_rekening: string;
  no_sim: string;
  kelompok_etnis: KelompokEtnis;
  kelahiran_kembar: boolean;
  jumlah_kembar: number;
  kewarganegaraan: string;
  indikator_meninggal: StatusPasien;
  tanggal_meninggal: Date;
}