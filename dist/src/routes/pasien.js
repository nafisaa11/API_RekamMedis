"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pasien_controller_1 = require("../controllers/pasien.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
// publicRoutes.post('/login', loginPasienController);
protectedRoutes
    // .use(authenticateToken, authenticateUser)
    .get('/', pasien_controller_1.getPasiensController)
    .get('/:id', pasien_controller_1.getPasienByIdController)
    .post('/create', pasien_controller_1.createPasienController);
// .put('/update/:id', updatePasienController)
// .delete('/delete/:id', deletePasienController);
const pasienRoutes = (0, express_1.Router)();
pasienRoutes.use(publicRoutes);
pasienRoutes.use(protectedRoutes);
exports.default = pasienRoutes;
