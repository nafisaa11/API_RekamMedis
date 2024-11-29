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
exports.getLayananController = getLayananController;
exports.getLayananByIdController = getLayananByIdController;
exports.createLayananController = createLayananController;
const layanan_service_1 = require("../service/layanan.service");
const response_1 = require("../utils/response");
function getLayananController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, layanan_service_1.getLayanan)();
            // ? : check if result is doesn't have status or invalid status
            if (result &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting all layanan: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getLayananByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid layanan ID',
            });
        }
        try {
            const result = yield (0, layanan_service_1.getLayananById)(id);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting layanan by ID: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createLayananController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        try {
            const result = yield (0, layanan_service_1.createLayanan)(bodyRequest);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while creating layanan: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
