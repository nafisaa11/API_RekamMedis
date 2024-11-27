"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const spesimen_controller_1 = require("../controllers/spesimen.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', spesimen_controller_1.getSpesimenController)
    .get('/:id', spesimen_controller_1.getSpesimenByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', spesimen_controller_1.createSpesimenController);
const spesimenRoutes = (0, express_1.Router)();
spesimenRoutes.use(publicRoutes);
spesimenRoutes.use(protectedRoutes);
exports.default = spesimenRoutes;
