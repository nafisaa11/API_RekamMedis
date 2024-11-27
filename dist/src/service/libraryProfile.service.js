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
exports.getLibraryProfiles = getLibraryProfiles;
exports.updateLibrary = updateLibrary;
const database_1 = __importDefault(require("../database"));
function getLibraryProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM library_profile');
            // ? : check if there are no library profiles
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No library profiles found',
                };
            }
            // ! : return the fetched library profile
            return {
                status: 200,
                message: 'Library profile fetched successfully!',
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
function updateLibrary(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM library_profile WHERE id = ?', [id]);
            const [result] = yield db.query(`
        UPDATE library_profile SET
        name = ?,
        address = ?,
        phone = ?,
        email = ?,
        year_establised = ?
        WHERE id = ?
      `, [
                bodyRequest.name,
                bodyRequest.address,
                bodyRequest.phone,
                bodyRequest.email,
                bodyRequest.year_established,
                id,
            ]);
            // ! : return the updated library profile
            return {
                status: 200,
                message: 'Library profile updated successfully!',
                payload: Object.assign(Object.assign({}, bodyRequest), { id }),
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
