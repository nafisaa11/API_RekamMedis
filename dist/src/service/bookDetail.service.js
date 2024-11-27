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
exports.getBookDetails = getBookDetails;
exports.getBookDetailById = getBookDetailById;
exports.createBookDetail = createBookDetail;
exports.updateBookDetail = updateBookDetail;
exports.deleteBookDetail = deleteBookDetail;
const database_1 = __importDefault(require("../database"));
function getBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        bd.id,
        b.title, 
        a.name AS author, 
        p.name AS publisher, 
        bd.published_date, 
        bd.isbn,
        bd.created_at, 
        bd.updated_at 
        FROM books_detail bd
        JOIN books b ON bd.books_id = b.id
        JOIN authors a ON bd.authors_id = a.id
        JOIN publishers p ON bd.publishers_id = p.id
      `);
            // ? : check if there are no book details
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No book details found',
                };
            }
            // ! : return the fetched book details
            return {
                status: 200,
                message: 'Book details fetched successfully!',
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
function getBookDetailById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        bd.id,
        b.title, 
        b.cover, 
        b.description, 
        c.name AS category, 
        s.name AS shelf, 
        b.total_page, 
        a.name AS author, 
        p.name AS publisher, 
        bd.published_date, 
        bd.isbn, 
        bd.created_at, 
        bd.updated_at 
        FROM books_detail bd
        JOIN books b ON bd.books_id = b.id
        JOIN categories c ON b.categories_id = c.id
        JOIN shelves s ON b.shelves_id = s.id
        JOIN authors a ON bd.authors_id = a.id
        JOIN publishers p ON bd.publishers_id = p.id
        WHERE bd.id = ?
      `, [id]);
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Book detail with id ${id} not found`,
                };
            }
            return {
                status: 200,
                message: 'Book detail fetched successfully!',
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
function createBookDetail(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        INSERT INTO books_detail (
          books_id,
          authors_id,
          publishers_id,
          published_date,
          isbn
        ) 
        VALUES (?, ?, ?, ?, ?)`, [
                bodyRequest.books_id,
                bodyRequest.authors_id,
                bodyRequest.publishers_id,
                bodyRequest.published_date,
                bodyRequest.isbn,
            ]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to create book detail',
                };
            }
            // ! : return the created book detail
            return {
                status: 201,
                message: 'Book detail created successfully!',
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
function updateBookDetail(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT * FROM books_detail WHERE id = ?`, [id]);
            // ? : check if the book detail is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Book detail with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`
        UPDATE books_detail SET
        books_id = ?,
        authors_id = ?,
        publishers_id = ?,
        published_date = ?,
        isbn = ?,
        WHERE id = ?
      `, [
                bodyRequest.books_id,
                bodyRequest.authors_id,
                bodyRequest.publishers_id,
                bodyRequest.published_date,
                bodyRequest.isbn,
                id,
            ]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to update book detail',
                };
            }
            // ! : return the updated book detail
            return {
                status: 200,
                message: 'Book detail updated successfully!',
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
function deleteBookDetail(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT * FROM books_detail WHERE id = ?`, [id]);
            // ? : check if the book detail is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Book detail with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`DELETE FROM books_detail WHERE id = ?`, [id]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to delete book detail',
                };
            }
            // ! : return the deleted book detail
            return {
                status: 200,
                message: 'Book detail deleted successfully!',
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
