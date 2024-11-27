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
exports.getShelves = getShelves;
exports.getShelfById = getShelfById;
exports.createShelf = createShelf;
exports.updateShelf = updateShelf;
exports.deleteShelf = deleteShelf;
const database_1 = __importDefault(require("../database"));
function getShelves() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM shelves');
            // ? : check if there are no shelves
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No shelves found',
                };
            }
            // ! : return the fetched shelf
            return {
                status: 200,
                message: 'Shelf fetched successfully!',
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
function getShelfById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM shelves WHERE id = ?', [id]);
            // ? : check if the shelf is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Shelf with id ${id} not found`,
                };
            }
            // ! : return the fetched category
            return {
                status: 200,
                message: 'Shelf fetched successfully!',
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
function createShelf(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        INSERT INTO shelves (
          name,
          description
        )
        VALUES (?, ?)
      `, [bodyRequest.name, bodyRequest.description]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to create shelf',
                };
            }
            // ! : return the created shelf
            return {
                status: 201,
                message: 'Shelf created successfully!',
                payload: {
                    id: bodyRequest.id,
                    name: bodyRequest.name,
                    description: bodyRequest.description,
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
function updateShelf(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM shelves WHERE id = ?', [id]);
            // ? : check if there is no shelf with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Shelf with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`
        UPDATE shelves SET
        name = ?,
        description = ?
        WHERE id = ?
      `, [bodyRequest.name, bodyRequest.description, id]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to update shelf',
                };
            }
            // ! : return the updated shelf
            return {
                status: 200,
                message: 'Shelf updated successfully!',
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
function deleteShelf(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM shelves WHERE id = ?', [id]);
            // ? : check if there is no shelf with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Shelf with id ${id} not found`,
                };
            }
            const [result] = yield db.query('DELETE FROM shelves WHERE id = ?', [id]);
            // ! : return the deleted shelf
            return {
                status: 200,
                message: `Shelf with id ${id} deleted successfully!`,
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
