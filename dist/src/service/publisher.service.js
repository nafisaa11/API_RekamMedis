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
exports.getPublishers = getPublishers;
exports.getPublisherById = getPublisherById;
exports.createPublisher = createPublisher;
exports.updatePublisher = updatePublisher;
exports.deletePublisher = deletePublisher;
const database_1 = __importDefault(require("../database"));
function getPublishers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM publishers');
            // ? : check if there are no publishers
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No publishers found',
                };
            }
            // ! : return the fetched publisher
            return {
                status: 200,
                message: 'Publisher fetched successfully!',
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
function getPublisherById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM publishers WHERE id = ?', [id]);
            // ? : check if the publisher is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Publisher with id ${id} not found`,
                };
            }
            // ! : return the fetched publisher
            return {
                status: 200,
                message: 'Publisher fetched successfully!',
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
function createPublisher(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        INSERT INTO publishers (
          name
        )
        VALUES (?)
      `, bodyRequest.name);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to create publisher',
                };
            }
            // ! : return the created publisher
            return {
                status: 201,
                message: 'Publisher created successfully!',
                payload: {
                    id: bodyRequest.id,
                    name: bodyRequest.name,
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
function updatePublisher(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM publishers WHERE id = ?', [id]);
            // ? : check if there is no publisher with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Publisher with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`
        UPDATE publishers SET
        name = ?
        WHERE id = ?
      `, [bodyRequest.name, id]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to update publisher',
                };
            }
            // ! : return the updated publisher
            return {
                status: 200,
                message: 'Publisher updated successfully!',
                payload: {
                    id,
                    name: bodyRequest.name,
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
function deletePublisher(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM publishers WHERE id = ?', [id]);
            // ? : check if there is no publisher with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Publisher with id ${id} not found`,
                };
            }
            const [result] = yield db.query('DELETE FROM publishers WHERE id = ?', [id]);
            // ! : return the deleted publisher
            return {
                status: 200,
                message: `Publisher with id ${id} deleted successfully!`,
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
