"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const publisher_controller_1 = require("../controllers/publisher.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', publisher_controller_1.getPublishersController)
    .get('/:id', publisher_controller_1.getPublisherByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', publisher_controller_1.createPublisherController)
    .put('/update/:id', publisher_controller_1.updatePublisherController)
    .delete('/delete/:id', publisher_controller_1.deletePublisherController);
const publisherRoutes = (0, express_1.Router)();
publisherRoutes.use(publicRoutes);
publisherRoutes.use(protectedRoutes);
exports.default = publisherRoutes;
