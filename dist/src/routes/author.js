"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const author_controller_1 = require("../controllers/author.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', author_controller_1.getAuthorsController)
    .get('/:id', author_controller_1.getAuthorByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', author_controller_1.createAuthorController)
    .put('/update/:id', author_controller_1.updateAuthorController)
    .delete('/delete/:id', author_controller_1.deleteAuthorController);
const authorRoutes = (0, express_1.Router)();
authorRoutes.use(publicRoutes);
authorRoutes.use(protectedRoutes);
exports.default = authorRoutes;
