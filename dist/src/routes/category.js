"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const category_controller_1 = require("../controllers/category.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', category_controller_1.getCategoriesController)
    .get('/:id', category_controller_1.getCategoryByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', category_controller_1.createCategoryController)
    .put('/update/:id', category_controller_1.updateCategoryController)
    .delete('/delete/:id', category_controller_1.deleteCategoryController);
const categoryRoutes = (0, express_1.Router)();
categoryRoutes.use(publicRoutes);
categoryRoutes.use(protectedRoutes);
exports.default = categoryRoutes;
