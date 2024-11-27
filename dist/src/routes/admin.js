"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes.post('/login', admin_controller_1.loginAdminController);
protectedRoutes
    // .use(authenticateToken, authenticateUser)
    .get('/', admin_controller_1.getAdminsController)
    .get('/:id', admin_controller_1.getAdminByIdController)
    .post('/create', admin_controller_1.createAdminController)
    .put('/update/:id', admin_controller_1.updateAdminController)
    .delete('/delete/:id', admin_controller_1.deleteAdminController);
const adminRoutes = (0, express_1.Router)();
adminRoutes.use(publicRoutes);
adminRoutes.use(protectedRoutes);
exports.default = adminRoutes;
