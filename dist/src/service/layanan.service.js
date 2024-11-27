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
exports.getLayanan = getLayanan;
exports.getLayananById = getLayananById;
exports.createLayanan = createLayanan;
const database_1 = __importDefault(require("../database"));
function getLayanan() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error("Cannot connect to database");
        try {
            const [rows] = yield db.query("SELECT * FROM layanan");
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
        }
        catch (error) {
            console.error("Database query error:", error);
            return {
                status: 500,
                message: "Internal server error",
            };
        }
        finally {
            yield db.end();
        }
    });
}
function getLayananById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error("Cannot connect to database");
        try {
            const [rows] = yield db.query("SELECT * FROM layanan WHERE id_layanan = ?", [id]);
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
        }
        catch (error) {
            console.error("Database query error:", error);
            return {
                status: 500,
                message: "Internal server error",
            };
        }
        finally {
            yield db.end();
        }
    });
}
function createLayanan(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error("Cannot connect to database");
        try {
            const [result] = yield db.query("INSERT INTO layanan (nama_layanan, biaya_layanan) VALUES (?, ?)", [bodyRequest.nama_layanan, bodyRequest.biaya_layanan]);
            // ! : return the created layanan
            return {
                status: 201,
                message: "Layanan created successfully!",
                payload: Object.assign({}, bodyRequest),
            };
        }
        catch (error) {
            console.error("Database query error:", error);
            return {
                status: 500,
                message: "Internal server error",
            };
        }
        finally {
            yield db.end();
        }
    });
}
