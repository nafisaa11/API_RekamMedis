"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const bookDetail_controller_1 = require("../controllers/bookDetail.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', bookDetail_controller_1.getBookDetailsController)
    .get('/:id', bookDetail_controller_1.getBookDetailByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', bookDetail_controller_1.createBookDetailController)
    .put('/update/:id', bookDetail_controller_1.updateBookDetailController)
    .delete('/delete/:id', bookDetail_controller_1.deleteBookDetailController);
const bookDetailRoutes = (0, express_1.Router)();
bookDetailRoutes.use(publicRoutes);
bookDetailRoutes.use(protectedRoutes);
exports.default = bookDetailRoutes;
