import { Dokter, DokterQueryResult } from './../models/dokter.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';


export async function getDokters () {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter'
    );

    // ? : check if the Dokters are found
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

  // ? : Check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE email = ?',
      [bodyRequest.email]
    );

    // ? Check if the email already exists
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

    // ? Check if the telepon number already exists
    if (rowsTelepon.length > 0) {
      return {
        status: 409,
        message: `Dokter with telepon number ${bodyRequest.no_hp} already exists`,
      };
    }

    // ? Insert new dokter
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO dokter (id_dokter, nama, email, jenis_kelamin, no_hp, tanggal_lahir, alamat, npi, spesialisasi, tanggal_lisensi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        bodyRequest.id_dokter,
        bodyRequest.nama,
        bodyRequest.email,
        bodyRequest.jenis_kelamin,
        bodyRequest.no_hp,
        bodyRequest.tanggal_lahir,
        bodyRequest.alamat,
        bodyRequest.npi,
        bodyRequest.spesialisasi,
        bodyRequest.tanggal_lisensi,
      ]
    );

    // ? Check if the insert was successful
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create dokter',
      };
    }

    // ? Return success response
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


// export async function updateDokter (id: number, bodyRequest: Dokter) {
//   const db = await getConnection();

//   // ? : check if the database connection is successful
//   if (!db) throw new Error('Cannot connect to database');

//   try {
//     const [rows] = await db.query<DokterQueryResult[]>(
//       'SELECT * FROM dokter WHERE id_dokter = ?',
//       [id]
//     );

//     // ? : check if the dokter is found
//     if (rows.length === 0) {
//       return {
//         status: 404,
//         message: 'Dokter not found',
//       };
//     }

//     // ? : hash the password
//     const hashedPassword = await hash(bodyRequest.password, 10);

//     const [result] = await db.query<ResultSetHeader>(
//       'UPDATE dokter SET npi = ?, nama_dokter = ?, jenis_kelamin = ?, tanggal_lahir = ?, telepon = ?, email = ?, password = ?, spesialisasi = ?, status_lisensi = ?, tanggal_lisensi = ?, nama_lisensi = ? WHERE id_dokter = ?',
//       [
//         bodyRequest.npi,
//         bodyRequest.nama_dokter,
//         bodyRequest.jenis_kelamin,
//         bodyRequest.tanggal_lahir,
//         bodyRequest.telepon,
//         bodyRequest.email,
//         hashedPassword,
//         bodyRequest.spesialisasi,
//         bodyRequest.status_lisensi,
//         bodyRequest.tanggal_lisensi,
//         bodyRequest.nama_lisensi,
//         id,
//       ]
//     );

//     // ? : check if the result is empty
//     if (result.affectedRows === 0) {
//       return {
//         status: 500,
//         message: 'Failed to update dokter',
//       };
//     }

//     return {
//       status: 200,
//       message: 'Update dokter successful',
//       payload: {
//         id,
//         ...bodyRequest,
//       },
//     };
//   } catch (error) {
//     console.error('Database query error:', error);
//     return {
//       status: 500,
//       message: 'Internal server error',
//     };
//   } finally {
//     await db.end();
//   }
// }

// export async function deleteDokter(id: number) {
//   const db = await getConnection();

//   // ? : check if the database connection is successful
//   if (!db) throw new Error('Cannot connect to database');

//   try {
//     const [rows] = await db.query<DokterQueryResult[]>(
//       'SELECT * FROM dokter WHERE id_dokter = ?',
//       [id]
//     );

//     // ? : check if there is no Dokter with the id
//     if (rows.length === 0) {
//       return {
//         status: 404,
//         message: `Dokter with id ${id} not found`,
//       };
//     }

//     const [result] = await db.query<ResultSetHeader>(
//       'DELETE FROM dokter WHERE id_dokter = ?',
//       [id]
//     );

//     // ! : return the deleted Dokter
//     return {
//       status: 200,
//       message: `Dokter with id ${id} deleted successfully!`,
//     };
//   } catch (error) {
//     console.error('Database query error:', error);
//     return {
//       status: 500,
//       message: 'Internal server error',
//     };
//   } finally {
//     await db.end();
//   }
