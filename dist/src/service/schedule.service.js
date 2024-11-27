"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedules = getSchedules;
exports.createSchedule = createSchedule;
const database_1 = __importDefault(require("../database"));
function getSchedules() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
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
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function createSchedule(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
      INSERT INTO jadwal_pemeriksaan
      (id_pemeriksaan, id_petugas, id_dokter, waktu_mulai, waktu_selesai, ruangan, status_jadwal)
      VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `, [
                bodyRequest.id_pemeriksaan,
                bodyRequest.id_petugas,
                bodyRequest.id_dokter,
                bodyRequest.waktu_mulai,
                bodyRequest.waktu_selesai,
                bodyRequest.ruangan,
                bodyRequest.status_jadwal
            ]);
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
                payload: Object.assign({}, bodyRequest),
            };
        }
        catch (error) {
            console.error('An error occurred while creating a schedule: ', error);
            return {
                status: 500,
                message: 'Failed to create schedule',
            };
        }
        finally {
            yield db.end();
        }
    });
}
