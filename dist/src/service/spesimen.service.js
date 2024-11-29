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
exports.getSpesimen = getSpesimen;
exports.getSpesimenById = getSpesimenById;
exports.createSpesimen = createSpesimen;
const database_1 = __importDefault(require("../database"));
function getSpesimen() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT * FROM spesimen`);
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
function getSpesimenById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT * FROM spesimen WHERE id_spesimen = ?`, [id]);
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
function createSpesimen(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`INSERT INTO spesimen (jenis_spesimen, tanggal_pengambilan, lokasi_pengambilan, tanggal_diterima, status_spesimen, catatan) VALUES (?, ?, ?, ?, ?, ?)`, [
                bodyRequest.jenis_spesimen,
                bodyRequest.tanggal_pengambilan,
                bodyRequest.lokasi_pengambilan,
                bodyRequest.tanggal_diterima,
                bodyRequest.status_spesimen,
                bodyRequest.catatan,
            ]);
            // ! : return the created spesimen
            return {
                status: 201,
                message: 'Spesimen created successfully!',
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
