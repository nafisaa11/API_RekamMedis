import { Spesimen, SpesimenQueryResult } from './../models/spesimen.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getSpesimen() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<SpesimenQueryResult[]>(
      `SELECT * FROM spesimen`
    );

    // ? : check if there are no spesimen
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No spesimen found',
      };
    }

    // ! : return the fetched spesimen
    return {
      status: 200,
      message: 'Spesimen fetched successfully!',
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

export async function getSpesimenById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<SpesimenQueryResult[]>(
      `SELECT * FROM spesimen WHERE id_spesimen = ?`,
      [id]
    );

    // ? : check if the spesimen is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Spesimen with id ${id} not found`,
      };
    }

    // ! : return the fetched spesimen
    return {
      status: 200,
      message: 'Spesimen fetched successfully!',
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

export async function createSpesimen(bodyRequest: Spesimen) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO spesimen (jenis_spesimen, tanggal_pengambilan, lokasi_pengambilan, tanggal_diterima, status_spesimen, catatan) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        bodyRequest.jenis_spesimen,
        bodyRequest.tanggal_pengambilan,
        bodyRequest.lokasi_pengambilan,
        bodyRequest.tanggal_diterima,
        bodyRequest.status_spesimen,
        bodyRequest.catatan,
      ]
    );

    // ! : return the created spesimen
    return {
      status: 201,
      message: 'Spesimen created successfully!',
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