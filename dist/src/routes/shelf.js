"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const shelf_controller_1 = require("../controllers/shelf.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', shelf_controller_1.getShelvesController)
    .get('/:id', shelf_controller_1.getShelfByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', shelf_controller_1.createShelfController)
    .put('/update/:id', shelf_controller_1.updateShelfController)
    .delete('/delete/:id', shelf_controller_1.deleteShelfController);
const shelfRoutes = (0, express_1.Router)();
shelfRoutes.use(publicRoutes);
shelfRoutes.use(protectedRoutes);
exports.default = shelfRoutes;
