import { Schedule, ScheduleQueryResult } from '../models/schedule.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getSchedules() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ScheduleQueryResult[]>(`
      SELECT 
        jadwal_pemeriksaan.id_jadwal,
        jadwal_pemeriksaan.waktu_mulai,
        jadwal_pemeriksaan.waktu_selesai,
        jadwal_pemeriksaan.ruangan,
        jadwal_pemeriksaan.status_jadwal,
        pasien.nama_lengkap as pasien,
        dokter.nama_dokter as dokter,
        petugas.nama_petugas as petugas
      FROM jadwal_pemeriksaan
      JOIN pemeriksaan ON jadwal_pemeriksaan.id_pemeriksaan = pemeriksaan.id_pemeriksaan
      JOIN pasien ON pemeriksaan.id_pasien = pasien.id_pasien
      JOIN dokter ON jadwal_pemeriksaan.id_dokter = dokter.id_dokter
      JOIN petugas ON jadwal_pemeriksaan.id_petugas = petugas.id_petugas
    `);

    // ? : check if there are no schedules
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No schedules found',
      };
    }

    // ! : return the fetched schedules
    return {
      status: 200,
      message: 'Schedules fetched successfully!',
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

export async function createSchedule(bodyRequest: Schedule) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
      INSERT INTO jadwal_pemeriksaan
      (id_pemeriksaan, id_petugas, id_dokter, waktu_mulai, waktu_selesai, ruangan, status_jadwal)
      VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `,
      [
        bodyRequest.id_pemeriksaan,
        bodyRequest.id_petugas,
        bodyRequest.id_dokter,
        bodyRequest.waktu_mulai,
        bodyRequest.waktu_selesai,
        bodyRequest.ruangan,
        bodyRequest.status_jadwal
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create schedule',
      };
    }

    // ! : return the created schedule
    return {
      status: 201,
      message: 'Schedule created successfully!',
      payload: {
        ...bodyRequest,
      },
    };
  } catch (error) {
    console.error('An error occurred while creating a schedule: ', error);
    return {
      status: 500,
      message: 'Failed to create schedule',
    };
  } finally {
    await db.end();
  }
}