"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_controller_1 = require("../controllers/schedule.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', schedule_controller_1.getScheduleController)
    .post('/create', schedule_controller_1.createScheduleController);
// protectedRoutes
//   .use(authenticateToken, authenticateUser)
//   .post('/create', createCategoryController)
//   .put('/update/:id', updateCategoryController)
//   .delete('/delete/:id', deleteCategoryController);
const scheduleRoutes = (0, express_1.Router)();
scheduleRoutes.use(publicRoutes);
// scheduleRoutes.use(protectedRoutes);
exports.default = scheduleRoutes;
