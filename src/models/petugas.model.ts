import { RowDataPacket } from 'mysql2';

enum Role {
  lab = 'lab',
  radiologi = 'radiologi',
}

export interface Petugas {
  id_petugas: number;
  nama_petugas: string;
  telepon: string;
  email: string;
  password: string;
  role: Role;
}

export interface PetugasQueryResult extends RowDataPacket {
  id_petugas: number;
  nama_petugas: string;
  telepon: string;
  email: string;
  password: string;
  role: string;
}