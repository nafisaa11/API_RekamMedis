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
exports.getRekamMedis = getRekamMedis;
exports.getRekamMedisById = getRekamMedisById;
exports.createRekamMedisById = createRekamMedisById;
const database_1 = __importDefault(require("../database"));
function getRekamMedis() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM rekam_medis');
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
        }
        catch (error) {
            console.error('An error occurred while getting all rekam medis: ', error);
            return {
                status: 500,
                message: 'An error occurred while getting all rekam medis',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function getRekamMedisById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM rekam_medis WHERE NO_RekamMedis = ?', [id]);
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
        }
        catch (error) {
            console.error('An error occurred while getting all rekam medis: ', error);
            return {
                status: 500,
                message: 'An error occurred while getting all rekam medis',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function createRekamMedisById(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query('INSERT INTO rekam_medis (NO_RekamMedis, ID_Pasien, Tanggal_MRS, Tanggal_KRS, Nama_RumahSakit, Keluhan, Diagnosa, Penanganan_Medis, Hasil_Pemeriksaan, Catatan, Nama_Dokter, Tindakan, Pelayanan, Obat, Rujukan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [bodyRequest.no_rekamMedis,
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
                bodyRequest.rujukan]);
        }
        catch (error) {
            console.error('An error occurred while creating rekam medis: ', error);
            return {
                status: 500,
                message: 'An error occurred while creating rekam medis',
            };
        }
        finally {
            yield db.end();
        }
    });
}
