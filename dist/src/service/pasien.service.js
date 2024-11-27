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
exports.getPasiens = getPasiens;
exports.getPasienById = getPasienById;
exports.createPasien = createPasien;
const database_1 = __importDefault(require("../database"));
const token_1 = require("../utils/token");
// export async function loginPasien(bodyRequest: Pasien) {
//   const db = await getConnection();
//   // ? : check if the database connection is successful
//   if (!db) throw new Error('Cannot connect to database');
//   try {
//     const [rows] = await db.query<PasienQueryResult[]>(
//       'SELECT * FROM pasien WHERE email = ?',
//       [bodyRequest.email]
//     );
//     // ? : check if the email is incorrect
//     if (rows.length === 0) {
//       return {
//         status: 404,
//         message: 'Incorrect email!',
//       };
//     }
//     // ? : check if the password is correct
//     const pasien = rows[0];
//     // ? : compare with the hashed password
//     const isPassowrdValid = await compare(
//       bodyRequest.password,
//       pasien.password
//     );
//     // ? : check if the password is incorrect
//     if (!isPassowrdValid) {
//       return {
//         status: 401,
//         message: 'Incorrect password!',
//       };
//     }
//     // ! : create a token
//     const token = createToken({
//       id_pasien: pasien.id_pasien,
//       nama_lengkap: pasien.nama_lengkap,
//       email: pasien.email,
//       role: 'pasien',
//     });
//     // ! : return the token
//     return {
//       status: 200,
//       message: 'Login successful',
//       payload: {
//         id_pasien: pasien.id_pasien,
//         nama_lengkap: pasien.nama_lengkap,
//         email: pasien.email,
//         token,
//       },
//     };
//   } catch (error) {
//     throw error;
//   }
// }
function getPasiens() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM pasien');
            // ? : check if the Pasiens are found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Pasiens not found',
                };
            }
            return {
                status: 200,
                message: 'Get all pasiens successful',
                payload: rows,
            };
        }
        catch (error) {
            console.error('An error occurred while getting all pasiens: ', error);
            return {
                status: 500,
                message: 'An error occurred while getting all pasiens',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function getPasienById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM pasien WHERE id_pasien = ?', [id]);
            // ? : check if the Pasien is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Pasien not found',
                };
            }
            return {
                status: 200,
                message: 'Get pasien by id successful',
                payload: rows[0],
            };
        }
        catch (error) {
            console.error('An error occurred while getting pasien by id: ', error);
            return {
                status: 500,
                message: 'An error occurred while getting pasien by id',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function createPasien(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rowsSim] = yield db.query('SELECT * FROM pasien WHERE no_sim = ?', [bodyRequest.no_sim]);
            // ? check if the ktp already exists
            if (rowsSim.length > 0) {
                return {
                    status: 409,
                    message: `Pasien with SIM ${bodyRequest.no_rekening} already exists`,
                };
            }
            const [rowTelepon] = yield db.query('SELECT * FROM pasien WHERE no_telp = ?', [bodyRequest.no_telp]);
            // ? check if the telepon already exists
            if (rowTelepon.length > 0) {
                return {
                    status: 409,
                    message: `Pasien with telepon ${bodyRequest.no_telp} already exists`,
                };
            }
            const [result] = yield db.query(`INSERT INTO pasien (
        id_pasien,
        id_eksternal,
        nama_lengkap,
        nama_panggilan,
        nama_ibu,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        agama,
        ras,
        alamat,
        kode_negara,
        no_telp,
        bahasa_utama,
        status_pernikahan,
        no_rekening,
        no_sim,
        kelompok_etnis,
        kelahiran_kembar,
        jumlah_kembar,
        kewarganegaraan,
        indikator_meninggal,
        tanggal_meninggal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                bodyRequest.id_pasien,
                bodyRequest.id_eksternal,
                bodyRequest.nama_lengkap,
                bodyRequest.nama_panggilan,
                bodyRequest.nama_ibu,
                bodyRequest.jenis_kelamin,
                bodyRequest.tempat_lahir,
                bodyRequest.tanggal_lahir,
                bodyRequest.agama,
                bodyRequest.ras,
                bodyRequest.alamat,
                bodyRequest.kode_negara,
                bodyRequest.no_telp,
                bodyRequest.bahasa_utama,
                bodyRequest.status_pernikahan,
                bodyRequest.no_rekening,
                bodyRequest.no_sim,
                bodyRequest.kelompok_etnis,
                bodyRequest.kelahiran_kembar,
                bodyRequest.jumlah_kembar,
                bodyRequest.kewarganegaraan,
                bodyRequest.indikator_meninggal,
                bodyRequest.tanggal_meninggal
            ]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to create pasien',
                };
            }
            // ! : create a token
            const token = (0, token_1.createToken)({
                id_pasien: bodyRequest.id_pasien,
                nama_lengkap: bodyRequest.nama_lengkap,
                no_telp: bodyRequest.no_telp
            });
            return {
                status: 201,
                message: 'Create pasien successful',
                payload: Object.assign(Object.assign({ id: result.insertId }, bodyRequest), { token }),
            };
        }
        catch (error) {
            console.error('An error occurred while creating pasien: ', error);
            return {
                status: 500,
                message: 'An error occurred while creating pasien',
            };
        }
        finally {
            yield db.end();
        }
    });
}
