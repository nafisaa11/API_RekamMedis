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
exports.loginPetugas = loginPetugas;
exports.getPetugas = getPetugas;
exports.getPetugasById = getPetugasById;
exports.createPetugas = createPetugas;
const bcrypt_1 = require("bcrypt");
const database_1 = __importDefault(require("../database"));
const token_1 = require("../utils/token");
function loginPetugas(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM petugas WHERE email = ?', [bodyRequest.email]);
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
            const token = (0, token_1.createToken)({
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
function getPetugas() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM petugas');
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
function getPetugasById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM petugas WHERE id_petugas = ?', [id]);
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
function createPetugas(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            // ? : hash the password
            const hashedPassword = yield (0, bcrypt_1.hash)(bodyRequest.password, 10);
            const [result] = yield db.query('INSERT INTO petugas (nama_petugas, telepon, email, password, role) VALUES (?, ?, ?, ?, ?)', [bodyRequest.nama_petugas, bodyRequest.telepon, bodyRequest.email, hashedPassword, bodyRequest.role]);
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
