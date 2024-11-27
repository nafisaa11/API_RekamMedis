"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dokter_controller_1 = require("../controllers/dokter.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
protectedRoutes
    // .use(authenticateToken, authenticateUser)
    .get('/', dokter_controller_1.getDoktersController)
    .post('/create', dokter_controller_1.createDokterController);
// .put('/update/:id', updateDokterController)
const dokterRoutes = (0, express_1.Router)();
dokterRoutes.use(publicRoutes);
dokterRoutes.use(protectedRoutes);
exports.default = dokterRoutes;
