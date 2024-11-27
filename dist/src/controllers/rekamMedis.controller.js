"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRekamMedisController = getRekamMedisController;
exports.getRekamMedisByIdController = getRekamMedisByIdController;
exports.createRekamMedisController = createRekamMedisController;
const rekamMedis_service_1 = require("../service/rekamMedis.service");
const response_1 = require("../utils/response");
function getRekamMedisController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, rekamMedis_service_1.getRekamMedis)();
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while getting all rekam medis: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getRekamMedisByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const result = yield (0, rekamMedis_service_1.getRekamMedisById)(id);
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while getting rekam medis by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createRekamMedisController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rekamMedis = req.body;
        if (!rekamMedis.no_rekamMedis) {
            return res.status(400).send({
                status: 400,
                message: 'All fields are required',
            });
        }
        try {
            const result = yield (0, rekamMedis_service_1.createRekamMedisById)(rekamMedis);
            return res.status(200).send(result);
        }
        catch (error) {
            console.error('An error occurred while creating rekam medis: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
