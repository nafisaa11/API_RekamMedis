import { Petugas, PetugasQueryResult } from "../models/petugas.model";

import bcrypt, { compare, hash } from "bcrypt";

import getConnection from "../database";
import { ResultSetHeader } from "mysql2";
import { createToken } from "../utils/token";

export async function loginPetugas(bodyRequest: Petugas) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PetugasQueryResult[]>(
      'SELECT * FROM petugas WHERE email = ?',
      [bodyRequest.email]
    );

    // ? : check if the email is incorrect
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Incorrect email!',
      };
    }

    // ? : check if the password is correct
    const petugas = rows[0];

    // // ? : compare with the hashed password
    // const isPassowrdValid = await compare(
    //   bodyRequest.password,
    //   petugas.password
    // );

    // // ? : check if the password is incorrect
    // if (!isPassowrdValid) {
    //   return {
    //     status: 401,
    //     message: 'Incorrect password!',
    //   };
    // }

    // ! : create a token
    const token = createToken({
      id_petugas: petugas.id_admin,
      nama_petugas: petugas.nama_petugas,
      email: petugas.email,
      role: 'petugas',
    });

    // ! : return the token
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        id_petugas: petugas.id_petugas,
        nama_petugas: petugas.nama_petugas,
        email: petugas.email,
        telepon: petugas.telepon,
        role: petugas.role,
        token: token,
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

export async function getPetugas() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PetugasQueryResult[]>(
      'SELECT * FROM petugas'
    );

    // ? : check if the Petugas are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Petugass not found',
      };
    }

    // ! : return the fetched petugas
    return {
      status: 200,
      message: 'Petugas fetched successfully!',
      payload: rows.map((petugas) => ({
        id_petugas: petugas.id_petugas,
        nama_petugas: petugas.nama_petugas,
        email: petugas.email,
        telepon: petugas.telepon,
        role: petugas.role,
      })),
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

export async function getPetugasById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PetugasQueryResult[]>(
      'SELECT * FROM petugas WHERE id_petugas = ?',
      [id]
    );

    // ? : check if the Petugas is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Petugas not found',
      };
    }

    // ! : return the fetched petugas
    const petugas = rows[0];
    return {
      status: 200,
      message: 'Petugas fetched successfully!',
      payload: {
        id_petugas: petugas.id_petugas,
        nama_petugas: petugas.nama_petugas,
        email: petugas.email,
        telepon: petugas.telepon,
        role: petugas.role,
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

export async function createPetugas(bodyRequest: Petugas) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    // ? : hash the password
    const hashedPassword = await hash(bodyRequest.password, 10);

    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO petugas (nama_petugas, telepon, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [bodyRequest.nama_petugas, bodyRequest.telepon, bodyRequest.email, hashedPassword, bodyRequest.role]
    );

    // ! : return the created petugas
    return {
      status: 201,
      message: 'Petugas created successfully!',
      payload: {
        id_petugas: result.insertId,
        nama_petugas: bodyRequest.nama_petugas,
        email: bodyRequest.email,
        telepon: bodyRequest.telepon,
        role: bodyRequest.role,
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