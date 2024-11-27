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
exports.getAuthors = getAuthors;
exports.getAuthorById = getAuthorById;
exports.createAuthor = createAuthor;
exports.updateAuthor = updateAuthor;
exports.deleteAuthor = deleteAuthor;
const database_1 = __importDefault(require("../database"));
function getAuthors() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM authors');
            // ? : check if there are no authors
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No authors found',
                };
            }
            // ! : return the fetched authors
            return {
                status: 200,
                message: 'Authors fetched successfully!',
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
function getAuthorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? :  check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM authors WHERE id = ?', [id]);
            // ? : check if the author is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Author with id ${id} not found`,
                };
            }
            // ! : return the fetched authors
            return {
                status: 200,
                message: 'Author fetched successfully!',
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
function createAuthor(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        INSERT INTO authors (
          name,
          description
        )
        VALUES (?, ?)
      `, [bodyRequest.name, bodyRequest.description]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to create author',
                };
            }
            // ! : return the created author
            return {
                status: 201,
                message: 'Author created successfully!',
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
function updateAuthor(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM authors WHERE id = ?', [id]);
            // ? : check if there is no author with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Author with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`
        UPDATE authors SET
        name = ?,
        description = ?
        WHERE id = ?
      `, [bodyRequest.name, bodyRequest.description, id]);
            // ! : return the updated author
            return {
                status: 200,
                message: 'Author updated successfully!',
                payload: {
                    id,
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
function deleteAuthor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM authors WHERE id = ?', [id]);
            // ? : check if there is no author with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Author with id ${id} not found`,
                };
            }
            const [result] = yield db.query('DELETE FROM authors WHERE id = ?', [id]);
            // ! : return the deleted author
            return {
                status: 200,
                message: `Author deleted with id ${id} successfully!`,
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
