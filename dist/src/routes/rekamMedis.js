"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rekamMedis_controller_1 = require("../controllers/rekamMedis.controller");
const rekamMedisRoutes = (0, express_1.Router)();
rekamMedisRoutes
    .get('/', rekamMedis_controller_1.getRekamMedisController)
    .get('/:id', rekamMedis_controller_1.getRekamMedisByIdController)
    .post('/create/:id', rekamMedis_controller_1.createRekamMedisController);
exports.default = rekamMedisRoutes;
