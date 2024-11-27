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
exports.loginAdminController = loginAdminController;
exports.createAdminController = createAdminController;
exports.getAdminsController = getAdminsController;
exports.getAdminByIdController = getAdminByIdController;
exports.updateAdminController = updateAdminController;
exports.deleteAdminController = deleteAdminController;
const admin_service_1 = require("../service/admin.service");
const response_1 = require("../utils/response");
function loginAdminController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = req.body;
        // ? : check if email and password are provided
        if (!admin.email || !admin.password) {
            return res.status(400).send({
                status: 400,
                message: 'Email and password are required',
            });
        }
        try {
            const result = yield (0, admin_service_1.loginAdmin)(admin);
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
            console.error('An error occurred while logging in admin: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createAdminController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = req.body;
        // ? : check if nama_admin, email, and password are provided
        if (!admin.nama_admin || !admin.email || !admin.password) {
            return res.status(400).send({
                status: 400,
                message: 'Nama, email, and password are required',
            });
        }
        try {
            const result = yield (0, admin_service_1.createAdmin)(admin);
            // ? : check if result doesn't have status or invalid status
            if (!result.status ||
                result.status < 200 ||
                result.status >= 300 ||
                typeof result.status !== 'number') {
                throw new Error('Invalid status code');
            }
            return res.status(result.status).send(result);
        }
        catch (error) {
            console.error('An error occurred while creating admin: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getAdminsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, admin_service_1.getAdmins)();
            // ? : check if result doesn't have status or invalid status
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
            console.error('An error occurred while getting all admins: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getAdminByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid admin ID',
            });
        }
        try {
            const result = yield (0, admin_service_1.getAdminById)(id);
            // ? : check if result doesn't have status or invalid status
            if (result.status &&
                result.status >= 200 &&
                result.status < 300 &&
                typeof result.status == 'number') {
                return res.status(result.status).send(result);
            }
            else if (result.status == 404) {
                return res.status(result.status).send(result);
            }
            else {
                throw new Error('Invalid status code');
            }
        }
        catch (error) {
            console.error('An error occurred while getting admin by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateAdminController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid admin ID',
            });
        }
        const admin = req.body;
        // ? : check if nama_admin, email, and password are provided
        if (!admin.nama_admin || !admin.email || !admin.password) {
            return res.status(400).send({
                status: 400,
                message: 'Name, email, and password are required',
            });
        }
        try {
            const result = yield (0, admin_service_1.updateAdmin)(id, admin);
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
            console.error('An error occurred while updating admin: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteAdminController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid admin ID',
            });
        }
        try {
            const result = yield (0, admin_service_1.deleteAdmin)(id);
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
            console.error('An error occurred while deleting admin: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
