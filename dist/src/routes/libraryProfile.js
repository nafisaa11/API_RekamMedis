"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const libraryProfile_controller_1 = require("../controllers/libraryProfile.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes.get('/', libraryProfile_controller_1.getLibraryProfilesController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .put('/update/:id', libraryProfile_controller_1.updateLibraryController);
const libraryProfileRoutes = (0, express_1.Router)();
libraryProfileRoutes.use(publicRoutes);
libraryProfileRoutes.use(protectedRoutes);
exports.default = libraryProfileRoutes;
