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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksController = getBooksController;
exports.getBookByIdController = getBookByIdController;
exports.getBookListController = getBookListController;
exports.getBookRecomendationController = getBookRecomendationController;
exports.getBookPopularController = getBookPopularController;
exports.getBookByCategoryController = getBookByCategoryController;
exports.createBookController = createBookController;
exports.updateBookController = updateBookController;
exports.deleteBookController = deleteBookController;
const book_service_1 = require("../service/book.service");
const response_1 = require("../utils/response");
function getBooksController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, book_service_1.getBooks)();
            // ? : check if result is doesn't have status or invalid status
            if (result &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting all books: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBookByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid book ID',
            });
        }
        try {
            const result = yield (0, book_service_1.getBookById)(id);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting a book by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBookListController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, book_service_1.getBookList)();
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting a book list: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBookRecomendationController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, book_service_1.getBookRecomendation)();
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting a book with stock: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBookPopularController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, book_service_1.getBookPopular)();
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting a popular book: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBookByCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = Number(req.params.id);
        // ? : check if categoryId is not a number
        if (isNaN(categoryId)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid category ID',
            });
        }
        try {
            const result = yield (0, book_service_1.getBookByCategory)(categoryId);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting a book by category: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createBookController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        const file = req.file;
        // ? : check if title and description is empty
        if (!bodyRequest.title || !bodyRequest.description) {
            return res.status(400).send({
                status: 400,
                message: 'Title and description are required',
            });
        }
        try {
            const result = yield (0, book_service_1.createBook)(bodyRequest, file);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while creating a book: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateBookController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid book ID',
            });
        }
        const bodyRequest = req.body;
        // ? : check if title and description is empty
        if (!bodyRequest.title || !bodyRequest.description) {
            return res.status(400).send({
                status: 400,
                message: 'Title and description are required',
            });
        }
        try {
            const result = yield (0, book_service_1.updateBook)(id, bodyRequest);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while updating a book: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteBookController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid book ID',
            });
        }
        try {
            const result = yield (0, book_service_1.deleteBook)(id);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while deleting a book: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
