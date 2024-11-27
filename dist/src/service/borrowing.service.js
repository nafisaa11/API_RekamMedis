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
exports.getBorrowings = getBorrowings;
exports.getBorrowingById = getBorrowingById;
exports.getBorrowingByMemberId = getBorrowingByMemberId;
exports.getBorrowingsLate = getBorrowingsLate;
exports.createBorrowing = createBorrowing;
exports.returnBorrowing = returnBorrowing;
exports.updateBorrowing = updateBorrowing;
exports.deleteBorrowing = deleteBorrowing;
const database_1 = __importDefault(require("../database"));
function getBorrowings() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        br.id,
        m.name AS member,
        b.title AS book,
        a.name AS admin,
        br.borrow_date,
        br.return_date,
        br.status
        FROM borrowings br
        JOIN members m ON br.members_id = m.id
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN admins a ON br.admins_id = a.id
        ORDER BY br.id
      `);
            // ? : check if there are no borrowings
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No borrowings found',
                };
            }
            // ! : return the fetched borrowings
            return {
                status: 200,
                message: 'Borrowings fetched successfully!',
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
function getBorrowingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        br.id,
        m.name AS member,
        b.title AS book,
        a.name AS admin,
        br.borrow_date,
        br.return_date,
        br.status
        FROM borrowings br
        JOIN members m ON br.members_id = m.id
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN admins a ON br.admins_id = a.id
        WHERE br.id = ?
      `, [id]);
            // ? : check if there are no borrowings
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No borrowings found',
                };
            }
            // ! : return the fetched borrowings
            return {
                status: 200,
                message: 'Borrowings fetched successfully!',
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
function getBorrowingByMemberId(memberId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
      SELECT
        b.title,
        b.cover,
        a.name AS author,
        st.quantity AS stock,
        sh.name AS shelf,
        br.borrow_date,
        br.return_date,
        br.status
      FROM
        borrowings br
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN authors a ON bd.authors_id = a.id
        JOIN stocks st ON b.id = st.books_id
        JOIN shelves sh ON b.shelves_id = sh.id
      WHERE
        br.members_id = ?
      `, [memberId]);
            // ? : check if there are no borrowings
            if (result.length === 0) {
                return {
                    status: 404,
                    message: 'No borrowings found',
                };
            }
            // ! : return the fetched borrowings
            return {
                status: 200,
                message: 'Borrowings fetched successfully!',
                payload: result,
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
function getBorrowingsLate() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`
        SELECT 
        br.id,
        m.name AS member,
        b.title AS book,
        a.name AS admin,
        br.borrow_date,
        br.return_date,
        br.status
        FROM borrowings br
        JOIN members m ON br.members_id = m.id
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN admins a ON br.admins_id = a.id
        WHERE br.status = 'late'
        ORDER BY br.id
      `);
            // ? : check if there are no late borrowings
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No late borrowings found',
                };
            }
            // ! : return the fetched borrowings
            return {
                status: 200,
                message: 'Borrowings fetched successfully!',
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
function createBorrowing(borrowing) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            yield db.beginTransaction();
            const [resultStock] = yield db.query(`
        SELECT
          st.quantity
        FROM
          stocks st
        JOIN
          books_detail bd ON st.books_id = bd.books_id
        WHERE
          bd.id = ?
      `, [borrowing.books_detail_id]);
            const currentStock = resultStock[0].quantity;
            // ? : check if the stock is not enough
            if (currentStock <= 0) {
                throw new Error('Book is out of stock');
            }
            // ! : get the book id from the books_detail_id
            const [bookDetailResult] = yield db.query(`SELECT books_id FROM books_detail WHERE id = ?`, [borrowing.books_detail_id]);
            const bookId = bookDetailResult[0].books_id;
            // ! : update stock quantity
            yield db.query(`UPDATE stocks SET quantity = quantity - 1 WHERE books_id = ?`, [bookId]);
            const [result] = yield db.query(`
        INSERT INTO borrowings (
          members_id,
          books_detail_id,
          admins_id,
          borrow_date,
          status
        )
        VALUES (?, ?, ?, NOW(), 'borrowed')
      `, [
                borrowing.members_id,
                borrowing.books_detail_id,
                borrowing.admins_id,
            ]);
            yield db.commit();
            // ! : return the created borrowing
            return {
                status: 201,
                message: 'Book borrowed successfully!',
                payload: {
                    id: result.insertId,
                    members: borrowing.members_id,
                    books_detail: borrowing.books_detail_id,
                    admins: borrowing.admins_id,
                    borrow_date: new Date(),
                    status: 'borrowed',
                },
            };
        }
        catch (error) {
            yield db.rollback();
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
function returnBorrowing(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            yield db.beginTransaction();
            const [borrowingResult] = yield db.query(`SELECT books_detail_id FROM borrowings WHERE id = ?`, [id]);
            const booksDetailId = borrowingResult[0].books_detail_id;
            yield db.query(`
        UPDATE borrowings SET
        status = 'returned',
        return_date = NOW()
        WHERE id = ?
      `, [id]);
            // ! : update stock quantity
            yield db.query(`
        UPDATE stocks SET
        quantity = quantity + 1
        WHERE books_id = ?
      `, [id]);
            yield db.commit();
            // ! : return the updated borrowing
            return {
                status: 200,
                message: 'Book returned successfully!',
                payload: {
                    id,
                    books_detail_id: booksDetailId,
                    return_date: new Date(),
                    status: 'returned',
                },
            };
        }
        catch (error) {
            yield db.rollback();
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
function updateBorrowing(id, borrowing) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        UPDATE borrowings SET
        members_id = ?,
        books_detail_id = ?,
        admins_id = ?,
        borrow_date = ?,
        return_date = ?,
        status = ?
        WHERE id = ?
      `, [
                borrowing.members_id,
                borrowing.books_detail_id,
                borrowing.admins_id,
                borrowing.borrow_date,
                borrowing.return_date,
                borrowing.status,
                id,
            ]);
            // ? : check if the borrowing is not found
            if (result.affectedRows === 0) {
                return {
                    status: 404,
                    message: 'Borrowing not found',
                };
            }
            // ! : return the updated borrowing
            return {
                status: 200,
                message: 'Borrowing updated successfully!',
                payload: Object.assign({}, borrowing),
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
function deleteBorrowing(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query(`SELECT * FROM borrowings WHERE id = ?`, [id]);
            // ? : check if the borrowing is not found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Borrowing not found',
                };
            }
            const [result] = yield db.query(`DELETE FROM borrowings WHERE id = ?`, [id]);
            // ! : return the deleted borrowing
            return {
                status: 200,
                message: 'Borrowing deleted successfully!',
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
