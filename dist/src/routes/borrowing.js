"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const borrowing_controller_1 = require("../controllers/borrowing.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', borrowing_controller_1.getBorrowingsController)
    .get('/late', borrowing_controller_1.getBorrowingsLateController)
    .get('/member/:id', borrowing_controller_1.getBorrowingsByMemberController)
    .get('/:id', borrowing_controller_1.getBorrowingByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', borrowing_controller_1.createBorrowingController)
    .put('/update/:id', borrowing_controller_1.updateBorrowingController)
    .put('/return/:id', borrowing_controller_1.returnBorrowingController)
    .delete('/delete/:id', borrowing_controller_1.deleteBorrowingController);
const borrowingRoutes = (0, express_1.Router)();
borrowingRoutes.use(publicRoutes);
borrowingRoutes.use(protectedRoutes);
exports.default = borrowingRoutes;
