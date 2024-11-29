"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const storage_1 = __importDefault(require("../utils/storage"));
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const book_controller_1 = require("../controllers/book.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: storage_1.default });
publicRoutes
    .get('/', book_controller_1.getBooksController)
    .get('/list', book_controller_1.getBookListController)
    .get('/recommendation', book_controller_1.getBookRecomendationController)
    .get('/popular', book_controller_1.getBookPopularController)
    .get('/category/:id', book_controller_1.getBookByCategoryController)
    .get('/:id', book_controller_1.getBookByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', upload.single('cover'), book_controller_1.createBookController)
    .put('/update/:id', book_controller_1.updateBookController)
    .delete('/delete/:id', book_controller_1.deleteBookController);
const bookRoutes = (0, express_1.Router)();
bookRoutes.use(publicRoutes);
bookRoutes.use(protectedRoutes);
exports.default = bookRoutes;
