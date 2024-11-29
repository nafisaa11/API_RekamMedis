import { Dokter, DokterQueryResult } from './../models/dokter.model';
import { ResultSetHeader } from 'mysql2';
import getConnection from '../database';

export async function getDokters() {
  const db = await getConnection();

  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>('SELECT * FROM dokter');

    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Dokters not found',
      };
    }

    return {
      status: 200,
      message: 'Get all dokters successful',
      payload: rows,
    };
  } catch (error) {
    console.error('An error occurred while getting all dokters: ', error);
    return {
      status: 500,
      message: 'An error occurred while getting all dokters',
    };
  } finally {
    await db.end();
  }
}

export async function createDokter(bodyRequest: Dokter) {
  const db = await getConnection();

  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<DokterQueryResult[]>(
      ' SELECT * FROM dokter WHERE email = ?',
      [bodyRequest.email]
    );

    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Dokter with email ${bodyRequest.email} already exists`,
      };
    }

    const [rowsTelepon] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE no_hp = ?',
      [bodyRequest.no_hp]
    );

    if (rowsTelepon.length > 0) {
      return {
        status: 409,
        message: `Dokter with telepon number ${bodyRequest.no_hp} already exists`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO dokter (id_dokter, nama, email, password, jenis_kelamin, no_hp, tanggal_lahir, alamat, npi, spesialisasi, tanggal_lisensi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        bodyRequest.id_dokter,
        bodyRequest.nama,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.jenis_kelamin,
        bodyRequest.no_hp,
        bodyRequest.tanggal_lahir,
        bodyRequest.alamat,
        bodyRequest.npi,
        bodyRequest.spesialisasi,
        bodyRequest.tanggal_lisensi,
      ]
    );

    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create dokter',
      };
    }

    return {
      status: 201,
      message: 'Dokter created successfully',
    };
  } catch (error) {
    console.error('An error occurred while creating dokter: ', error);
    return {
      status: 500,
      message: 'An error occurred while creating dokter',
    };
  }
}

export async function deleteDokter(id: string) {
  const db = await getConnection();

  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE id_dokter = ?',
      [id]
    );

    if (rows.length === 0) {
      return {
        status: 404,
        message: `Dokter with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM dokter WHERE id_dokter = ?',
      [id]
    );

    return {
      status: 200,
      message: `Dokter with id ${id} deleted successfully!`,
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

export async function updateDokter(id: string, bodyRequest: Dokter) {
  const db = await getConnection();

  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE id_dokter = ?',
      [id]
    );

    if (rows.length === 0) {
      return {
        status: 404,
        message: `Dokter with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'UPDATE dokter SET nama = ?, email = ?, password = ?, jenis_kelamin = ?, no_hp = ?, tanggal_lahir = ?, alamat = ?, npi = ?, spesialisasi = ?, tanggal_lisensi = ? WHERE id_dokter = ?',
      [
        bodyRequest.nama,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.jenis_kelamin,
        bodyRequest.no_hp,
        bodyRequest.tanggal_lahir,
        bodyRequest.alamat,
        bodyRequest.npi,
        bodyRequest.spesialisasi,
        bodyRequest.tanggal_lisensi,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to update dokter',
      };
    }

    return {
      status: 200,
      message: `Dokter with id ${id} updated successfully!`,
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