"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dokter_1 = __importDefault(require("./dokter"));
const pasien_1 = __importDefault(require("./pasien"));
const rekamMedis_1 = __importDefault(require("./rekamMedis"));
const router = (0, express_1.Router)();
router
    .use('/dokter', dokter_1.default)
    .use('/pasien', pasien_1.default)
    .use('/rekam-medis', rekamMedis_1.default);
exports.default = router;
