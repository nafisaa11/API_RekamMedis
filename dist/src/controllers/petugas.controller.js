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
exports.loginPetugasController = loginPetugasController;
exports.getPetugasController = getPetugasController;
exports.getPetugasByIdController = getPetugasByIdController;
exports.createPetugasController = createPetugasController;
const petugas_service_1 = require("../service/petugas.service");
const response_1 = require("../utils/response");
function loginPetugasController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const petugas = req.body;
        // ? : check if email and password are provided
        if (!petugas.email || !petugas.password) {
            return res.status(400).send({
                status: 400,
                message: 'Email and password are required',
            });
        }
        try {
            const result = yield (0, petugas_service_1.loginPetugas)(petugas);
            // ! : set token in cookie if login is successful
            if (result.status === 200 && result.payload) {
                res.cookie('token', result.payload.token, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    // sameSite: 'none',
                });
            }
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while logging in petugas: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getPetugasController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, petugas_service_1.getPetugas)();
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while fetching petugas: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getPetugasByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is provided
        if (!id) {
            return res.status(400).send({
                status: 400,
                message: 'ID is required',
            });
        }
        try {
            const result = yield (0, petugas_service_1.getPetugasById)(id);
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while fetching petugas by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createPetugasController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const petugas = req.body;
        // ? : check if nama_petugas, email, and password are provided
        if (!petugas.nama_petugas || !petugas.email || !petugas.password) {
            return res.status(400).send({
                status: 400,
                message: 'Nama, email, and password are required',
            });
        }
        try {
            const result = yield (0, petugas_service_1.createPetugas)(petugas);
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while creating petugas: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
