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
exports.getPemeriksaan = getPemeriksaan;
exports.getPemeriksaanById = getPemeriksaanById;
exports.createPemeriksaan = createPemeriksaan;
const database_1 = __importDefault(require("../database"));
function getPemeriksaan() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT
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
        JOIN layanan ON pemeriksaan.id_layanan = layanan.id_layanan`);
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
function getPemeriksaanById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT
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
        WHERE pemeriksaan.id_pemeriksaan = ?`, [id]);
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
function createPemeriksaan(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        const idSpesimen = bodyRequest.id_spesimen !== null ? bodyRequest.id_spesimen : null;
        try {
            const [result] = yield db.query('INSERT INTO pemeriksaan (id_pasien, id_dokter, id_spesimen, id_layanan, jenis_pemeriksaan, tanggal_permintaan, prioritas, status_permintaan, catatan_dokter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                bodyRequest.id_pasien,
                bodyRequest.id_dokter,
                idSpesimen,
                bodyRequest.id_layanan,
                bodyRequest.jenis_pemeriksaan,
                bodyRequest.tanggal_permintaan,
                bodyRequest.prioritas,
                bodyRequest.status_permintaan,
                bodyRequest.catatan_dokter,
            ]);
            // ! : return the inserted pemeriksaan
            return {
                status: 201,
                message: 'Pemeriksaan created successfully!',
                payload: Object.assign({}, bodyRequest),
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
