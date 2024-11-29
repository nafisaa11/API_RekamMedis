"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const layanan_controller_1 = require("../controllers/layanan.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', layanan_controller_1.getLayananController)
    .get('/:id', layanan_controller_1.getLayananByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', layanan_controller_1.createLayananController);
const layananRoutes = (0, express_1.Router)();
layananRoutes.use(publicRoutes);
layananRoutes.use(protectedRoutes);
exports.default = layananRoutes;
