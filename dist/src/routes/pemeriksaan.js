"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const pemeriksaan_controller_1 = require("../controllers/pemeriksaan.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', pemeriksaan_controller_1.getPemeriksaanController)
    .get('/:id', pemeriksaan_controller_1.getPemeriksaanByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', pemeriksaan_controller_1.createPemeriksaanController);
const pemeriksaanRoutes = (0, express_1.Router)();
pemeriksaanRoutes.use(publicRoutes);
pemeriksaanRoutes.use(protectedRoutes);
exports.default = pemeriksaanRoutes;
