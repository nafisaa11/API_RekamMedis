import { RekamMedis, RekamMedisQueryResult } from "../models/rekamMedis.model";

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function getRekamMedis () {
    const db = await getConnection();
    
    if (!db) throw new Error('Cannot connect to database');
    
    try {
        const [rows] = await db.query<RekamMedisQueryResult[]>('SELECT * FROM rekam_medis');
    
        // ? : check if the rekam medis are found
        if (rows.length === 0) {
        return {
          status: 404,
          message: 'Rekam Medis not found',
        };
      }

      return {
        status: 200,
        message: 'Get all Rekam Medis successful',
        payload: rows,
      };
    } catch (error) {
        console.error('An error occurred while getting all rekam medis: ', error);
        return {
          status: 500,
          message: 'An error occurred while getting all rekam medis',
        };
    } finally {
        await db.end();
    }
}

export async function getRekamMedisById(id: string) {
    const db = await getConnection();
    
    if (!db) throw new Error('Cannot connect to database');
    
    try {
        const [rows] = await db.query<RekamMedisQueryResult[]>('SELECT * FROM rekam_medis WHERE NO_RekamMedis = ?', [id]);
    
        // ? : check if the rekam medis are found
        if (rows.length === 0) {
        return {
          status: 404,
          message: 'Rekam Medis not found',
        };
      }

      return {
        status: 200,
        message: 'Get all Rekam Medis successful',
        payload: rows,
      };
    } catch (error) {
        console.error('An error occurred while getting all rekam medis: ', error);
        return {
          status: 500,
          message: 'An error occurred while getting all rekam medis',
        };
    } finally {
        await db.end();
    }
}

export async function createRekamMedisById(bodyRequest: RekamMedis) {
    const db = await getConnection();
    
    if (!db) throw new Error('Cannot connect to database');
    
    try {
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO rekam_medis (NO_RekamMedis, ID_Pasien, Tanggal_MRS, Tanggal_KRS, Nama_RumahSakit, Keluhan, Diagnosa, Penanganan_Medis, Hasil_Pemeriksaan, Catatan, Nama_Dokter, Tindakan, Pelayanan, Obat, Rujukan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [bodyRequest.no_rekamMedis, 
          bodyRequest.id_pasien, 
          bodyRequest.tanggal_mrs,
           bodyRequest.tanggal_krs, 
           bodyRequest.nama_rumahSakit,
            bodyRequest.keluhan, 
            bodyRequest.diagnosa, 
            bodyRequest.penanganan_medis, 
            bodyRequest.hasil_pemeriksaan, 
            bodyRequest.catatan, 
            bodyRequest.nama_dokter, 
            bodyRequest.tindakan, 
            bodyRequest.pelayanan, 
            bodyRequest.obat, 
            bodyRequest.rujukan]
        );
    }
    catch (error) {
        console.error('An error occurred while creating rekam medis: ', error);
        return {
          status: 500,
          message: 'An error occurred while creating rekam medis',
        };
    } finally {
        await db.end();
    }
}