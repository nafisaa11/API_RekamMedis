import { Admin, AdminQueryResult } from '../models/admin.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function loginAdmin(bodyRequest: Admin) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE email = ?',
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
    const admin = rows[0];

    // // ? : compare with the hashed password
    // const isPassowrdValid = await compare(
    //   bodyRequest.password,
    //   admin.password
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
      id_admin: admin.id_admin,
      nama_admin: admin.nama_admin,
      email: admin.email,
      role: 'admin',
    });

    // ! : return the token
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        id_admin: admin.id_admin,
        nama_admin: admin.nama_admin,
        email: admin.email,
        telepon: admin.telepon,
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

export async function getAdmins() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin'
    );

    // ? : check if the admins are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Admins not found',
      };
    }

    // ! : return the fetched admins
    return {
      status: 200,
      message: 'Admins fetched successfully!',
      payload: rows.map((admin) => ({
        id_admin: admin.id_admin,
        nama_admin: admin.nama_admin,
        email: admin.email,
        telepon: admin.telepon,
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

export async function getAdminById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE id_admin = ?',
      [id]
    );

    // ? : check if the admin is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin with id ${id} not found`,
      };
    }

    // ! : return the fetched admin
    return {
      status: 200,
      message: 'Admin fetched successfully!',
      payload: {
        id_admin: rows[0].id_admin,
        nama_admin: rows[0].nama_admin,
        email: rows[0].email,
        telepon: rows[0].telepon,
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

export async function createAdmin(bodyRequest: Admin) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE email = ?',
      [bodyRequest.email]
    );

    // ? check if the email already exists
    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Admin with email ${bodyRequest.email} already exists`,
      };
    }

    const [rowsTelepon] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE telepon = ?',
      [bodyRequest.telepon]
    );

    // ? check if the telepon number already exists
    if (rowsTelepon.length > 0) {
      return {
        status: 409,
        message: `Admin with telepon number ${bodyRequest.telepon} already exists`,
      };
    }

    // ! : hash the password
    const hashedPassword = await bcrypt.hash(bodyRequest.password, 10);

    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO admin (nama_admin, email, password, telepon)
        VALUES (?, ?, ?, ?)
      `,
      [
        bodyRequest.nama_admin,
        bodyRequest.email,
        hashedPassword,
        bodyRequest.telepon,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create admin',
      };
    }

    // ! : create a token
    const token = createToken({
      id_admin: bodyRequest.id_admin,
      nama_admin: bodyRequest.nama_admin,
      email: bodyRequest.email,
    });

    // ! : return the admin
    return {
      status: 201,
      message: 'Admin created successfully!',
      payload: {
        id_admin: bodyRequest.id_admin,
        nama_admin: bodyRequest.nama_admin,
        email: bodyRequest.email,
        telepon: bodyRequest.telepon,
        token,
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

export async function updateAdmin(id: number, bodyRequest: Admin) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE id_admin = ?',
      [id]
    );

    // ? : check if there is no admin with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin with id ${id} not found`,
      };
    }

    // ! : hash the password
    const hashedPassword = await bcrypt.hash(bodyRequest.password, 10);
    bodyRequest.password = hashedPassword;

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE admin SET
        nama_admin = ?,
        email = ?,
        password = ?,
        telepon = ?
        WHERE id_admin = ?
      `,
      [
        bodyRequest.nama_admin,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.telepon,
        id,
      ]
    );

    // ! : return the updated admin
    return {
      status: 200,
      message: 'Admin updated successfully!',
      payload: {
        id_admin: bodyRequest.id_admin,
        nama_admin: bodyRequest.nama_admin,
        email: bodyRequest.email,
        telepon: bodyRequest.telepon,
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

export async function deleteAdmin(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE id_admin = ?',
      [id]
    );

    // ? : check if there is no admin with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM admin WHERE id_admin = ?',
      [id]
    );

    // ! : return the deleted admin
    return {
      status: 200,
      message: `Admin with id ${id} deleted successfully!`,
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
