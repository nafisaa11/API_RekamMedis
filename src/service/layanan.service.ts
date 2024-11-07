import { Layanan, LayananQueryResult } from "../models/layanan.model";

import getConnection from "../database";
import { ResultSetHeader } from "mysql2";

export async function getLayanan() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error("Cannot connect to database");

  try {
    const [rows] = await db.query<LayananQueryResult[]>(
      "SELECT * FROM layanan"
    );

    // ? : check if there are no layanan
    if (rows.length === 0) {
      return {
        status: 404,
        message: "No layanan found",
      };
    }

    // ! : return the fetched layanan
    return {
      status: 200,
      message: "Layanan fetched successfully!",
      payload: rows,
    };
  } catch (error) {
    console.error("Database query error:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  } finally {
    await db.end();
  }
}

export async function getLayananById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error("Cannot connect to database");

  try {
    const [rows] = await db.query<LayananQueryResult[]>(
      "SELECT * FROM layanan WHERE id_layanan = ?",
      [id]
    );

    // ? : check if the layanan is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Layanan with id ${id} not found`,
      };
    }

    // ! : return the fetched layanan
    return {
      status: 200,
      message: "Layanan fetched successfully!",
      payload: {
        id_layanan: rows[0].id_layanan,
        nama_layanan: rows[0].nama_layanan,
        biaya_layanan: rows[0].biaya_layanan,
      },
    };
  } catch (error) {
    console.error("Database query error:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  } finally {
    await db.end();
  }
}

export async function createLayanan(bodyRequest: Layanan) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error("Cannot connect to database");

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO layanan (nama_layanan, biaya_layanan) VALUES (?, ?)",
      [bodyRequest.nama_layanan, bodyRequest.biaya_layanan]
    );

    // ! : return the created layanan
    return {
      status: 201,
      message: "Layanan created successfully!",
      payload: {
        ...bodyRequest,
      },
    };
  } catch (error) {
    console.error("Database query error:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  } finally {
    await db.end();
  }
}