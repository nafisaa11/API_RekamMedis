"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const authenticateUser_1 = require("../middleware/authenticateUser");
const stock_controller_1 = require("../controllers/stock.controller");
const publicRoutes = (0, express_1.Router)();
const protectedRoutes = (0, express_1.Router)();
publicRoutes
    .get('/', stock_controller_1.getStocksController)
    .get('/:id', stock_controller_1.getStockByIdController);
protectedRoutes
    .use(authenticateToken_1.authenticateToken, authenticateUser_1.authenticateUser)
    .post('/create', stock_controller_1.createStockController)
    .put('/update/:id', stock_controller_1.updateStockController)
    .delete('/delete/:id', stock_controller_1.deleteStockController);
const stockRoutes = (0, express_1.Router)();
stockRoutes.use(publicRoutes);
stockRoutes.use(protectedRoutes);
exports.default = stockRoutes;
