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
exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const database_1 = __importDefault(require("../database"));
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM categories');
            // ? : check if there are no categories
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'No categories found',
                };
            }
            // ! : return the fetched categories
            return {
                status: 200,
                message: 'Categories fetched successfully!',
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
function getCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM categories WHERE id = ?', [id]);
            // ? : check if the category is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Category with id ${id} not found`,
                };
            }
            // ! : return the fetched category
            return {
                status: 200,
                message: 'Category fetched successfully!',
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
function createCategory(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [result] = yield db.query(`
        INSERT INTO categories (
          name
        ) 
        VALUES (?)
      `, bodyRequest.name);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to create category',
                };
            }
            // ! : return the created category
            return {
                status: 201,
                message: 'Category created successfully!',
                payload: {
                    id: bodyRequest.id,
                    name: bodyRequest.name,
                },
            };
        }
        catch (error) {
            console.error('An error occurred while creating a category: ', error);
            return {
                status: 500,
                message: 'Failed to create category',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function updateCategory(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM categories WHERE id = ?', [id]);
            // ? : check if there is no category with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Category with id ${id} not found`,
                };
            }
            const [result] = yield db.query(`
        UPDATE categories SET
        name = ?
        WHERE id = ?
      `, [bodyRequest.name, id]);
            // ! : return the updated category
            return {
                status: 200,
                message: 'Category updated successfully!',
                payload: {
                    id,
                    name: bodyRequest.name,
                },
            };
        }
        catch (error) {
            console.error('An error occurred while updating a category: ', error);
            return {
                status: 500,
                message: 'Failed to update category',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM categories WHERE id = ?', [id]);
            // ? : check if there is no category with the id
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: `Category with id ${id} not found`,
                };
            }
            const [result] = yield db.query('DELETE FROM categories WHERE id = ?', [id]);
            // ! : return the deleted category
            return {
                status: 200,
                message: `Category with id ${id} deleted successfully!`,
            };
        }
        catch (error) {
            console.error('An error occurred while deleting a category: ', error);
            return {
                status: 500,
                message: 'Failed to delete category',
            };
        }
        finally {
            yield db.end();
        }
    });
}
