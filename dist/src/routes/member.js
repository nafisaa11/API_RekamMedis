"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const member_controller_1 = require("../controllers/member.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', member_controller_1.getMembersController)
    .get('/:id', member_controller_1.getMemberByIdController)
    .post('/register', member_controller_1.registerMemberController)
    .post('/login', member_controller_1.loginMemberController)
    .put('/update/:id', member_controller_1.updateMemberController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .delete('/delete/:id', member_controller_1.deleteMemberController);
const memberRoutes = (0, express_1.Router)();
memberRoutes.use(publicRoutes);
memberRoutes.use(protectedRoutes);
exports.default = memberRoutes;
