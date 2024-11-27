"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const petugas_controller_1 = require("../controllers/petugas.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes.post('/login', petugas_controller_1.loginPetugasController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .get('/', petugas_controller_1.getPetugasController)
    .get('/:id', petugas_controller_1.getPetugasByIdController)
    .post('/create', petugas_controller_1.createPetugasController);
// .put('/update/:id', updatePetugasController)
// .delete('/delete/:id', deletePetugasController);
const petugasRoutes = (0, express_1.Router)();
petugasRoutes.use(publicRoutes);
petugasRoutes.use(protectedRoutes);
exports.default = petugasRoutes;
