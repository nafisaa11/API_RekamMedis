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
exports.getStocks = getStocks;
exports.getStockById = getStockById;
exports.createStock = createStock;
exports.updateStock = updateStock;
exports.deleteStock = deleteStock;
const database_1 = __importDefault(require("../database"));
function getStocks() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        s.id, 
        b.title AS books,
        s.quantity, 
        s.created_at, 
        s.updated_at 
        FROM stocks s
        JOIN books b ON s.books_id = b.id
      `);
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No stocks found',
                };
            }
            return {
                status: 200,
                message: 'Stocks fetched successfully!',
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
function getStockById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        s.id, 
        b.title AS books,
        s.quantity, 
        s.created_at, 
        s.updated_at 
        FROM stocks s
        JOIN books b ON s.books_id = b.id
        WHERE s.id = ?
      `, [id]);
            // ? : check if the stock is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No stock found',
                };
            }
            // ? : return the stock
            return {
                status: 200,
                message: 'Stock fetched successfully!',
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
function createStock(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        INSERT INTO stocks (
          books_id,
          quantity
        ) 
        VALUES (?, ?)
      `, [bodyRequest.books_id, bodyRequest.quantity]);
            return {
                status: 201,
                message: 'Stock created successfully!',
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
function updateStock(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        UPDATE stocks SET
        books_id = ?,
        quantity = ?
        WHERE id = ?
      `, [bodyRequest.books_id, bodyRequest.quantity, id]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 404,
                    message: `Stock with id ${id} not found`,
                };
            }
            // ? : return the updated stock
            return {
                status: 200,
                message: 'Stock updated successfully!',
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
function deleteStock(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        s.id, 
        s.books_id, 
        s.quantity, 
        s.created_at, 
        s.updated_at 
        FROM stocks s
        WHERE s.id = ?
      `, [id]);
            // ? : check if the stock is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Stock with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`DELETE FROM stocks WHERE id = ?`, [id]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to delete stock',
                };
            }
            // ? : return the deleted stock
            return {
                status: 200,
                message: 'Stock deleted successfully!',
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
