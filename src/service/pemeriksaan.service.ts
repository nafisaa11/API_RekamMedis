import { Pemeriksaan, PemeriksaanQueryResult } from './../models/pemeriksaan.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getPemeriksaan() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PemeriksaanQueryResult[]>(
      `SELECT
        pemeriksaan.id_pemeriksaan,
        pasien.nama_lengkap,
        dokter.nama_dokter,
        spesimen.jenis_spesimen,
        layanan.nama_layanan,
        pemeriksaan.jenis_pemeriksaan,
        pemeriksaan.tanggal_permintaan,
        pemeriksaan.prioritas,
        pemeriksaan.status_permintaan,
        pemeriksaan.catatan_dokter
        FROM pemeriksaan
        JOIN pasien ON pemeriksaan.id_pasien = pasien.id_pasien
        JOIN dokter ON pemeriksaan.id_dokter = dokter.id_dokter
        JOIN spesimen ON pemeriksaan.id_spesimen = spesimen.id_spesimen
        JOIN layanan ON pemeriksaan.id_layanan = layanan.id_layanan`

    );

    // ? : check if there are no pemeriksaan
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No pemeriksaan found',
      };
    }

    // ! : return the fetched pemeriksaan
    return {
      status: 200,
      message: 'Pemeriksaan fetched successfully!',
      payload: rows,
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await db.end();
  }
}

export async function getPemeriksaanById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PemeriksaanQueryResult[]>(
      `SELECT
        pemeriksaan.id_pemeriksaan,
        pasien.nama_lengkap,
        dokter.nama_dokter,
        spesimen.jenis_spesimen,
        layanan.nama_layanan,
        pemeriksaan.jenis_pemeriksaan,
        pemeriksaan.tanggal_permintaan,
        pemeriksaan.prioritas,
        pemeriksaan.status_permintaan,
        pemeriksaan.catatan_dokter
        FROM pemeriksaan
        JOIN pasien ON pemeriksaan.id_pasien = pasien.id_pasien
        JOIN dokter ON pemeriksaan.id_dokter = dokter.id_dokter
        JOIN spesimen ON pemeriksaan.id_spesimen = spesimen.id_spesimen
        JOIN layanan ON pemeriksaan.id_layanan = layanan.id_layanan
        WHERE pemeriksaan.id_pemeriksaan = ?`,
      [id]
    );

    // ? : check if the pemeriksaan is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Pemeriksaan with id ${id} not found`,
      };
    }

    // ! : return the fetched pemeriksaan
    return {
      status: 200,
      message: 'Pemeriksaan fetched successfully!',
      payload: rows[0],
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await db.end();
  }
}

export async function createPemeriksaan(bodyRequest: Pemeriksaan) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  const idSpesimen =
    bodyRequest.id_spesimen !== null ? bodyRequest.id_spesimen : null;

  try {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO pemeriksaan (id_pasien, id_dokter, id_spesimen, id_layanan, jenis_pemeriksaan, tanggal_permintaan, prioritas, status_permintaan, catatan_dokter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        bodyRequest.id_pasien,
        bodyRequest.id_dokter,
        idSpesimen,
        bodyRequest.id_layanan,
        bodyRequest.jenis_pemeriksaan,
        bodyRequest.tanggal_permintaan,
        bodyRequest.prioritas,
        bodyRequest.status_permintaan,
        bodyRequest.catatan_dokter,
      ]
    );

    // ! : return the inserted pemeriksaan
    return {
      status: 201,
      message: 'Pemeriksaan created successfully!',
      payload: {
        ...bodyRequest,
      },
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await db.end();
  }
}