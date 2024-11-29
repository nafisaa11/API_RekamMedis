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
exports.createPasienController = createPasienController;
exports.getPasiensController = getPasiensController;
exports.getPasienByIdController = getPasienByIdController;
const pasien_service_1 = require("../service/pasien.service");
const response_1 = require("../utils/response");
// export async function loginPasienController(req: Request, res: Response) {
//   const pasien = req.body as Pasien;
//   // ? : check if email and password are provided
//   if (!pasien.email || !pasien.password) {
//     return res.status(400).send({
//       status: 400,
//       message: 'Email and password are required',
//     });
//   }
//   try {
//     const result = await loginPasien(pasien);
//     // ! : set token in cookie if login is successful
//     if (result.status === 200 && result.payload) {
//       res.cookie('token', result.payload.token, {
//         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//         httpOnly: false,
//         secure: process.env.NODE_ENV === 'production',
//         // sameSite: 'none',
//       });
//     }
//     return res.status(result.status).send(result);
//   } catch (error) {
//     console.error('An error occurred while logging in pasien: ', error);
//     return res.status(serverError.status).send(serverError);
//   }
// }
function createPasienController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pasien = req.body;
        // ? : check if those field are provided
        if (!pasien.nama_lengkap) {
            return res.status(400).send({
                status: 400,
                message: 'All fields are required',
            });
        }
        try {
            const result = yield (0, pasien_service_1.createPasien)(pasien);
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while creating pasien: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getPasiensController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, pasien_service_1.getPasiens)();
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while fetching pasiens: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getPasienByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid id',
            });
        }
        try {
            const result = yield (0, pasien_service_1.getPasienById)(id);
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while fetching pasien by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
