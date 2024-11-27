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
exports.registerMemberController = registerMemberController;
exports.loginMemberController = loginMemberController;
exports.getMembersController = getMembersController;
exports.getMemberByIdController = getMemberByIdController;
exports.updateMemberController = updateMemberController;
exports.deleteMemberController = deleteMemberController;
const member_service_1 = require("../service/member.service");
const response_1 = require("../utils/response");
function registerMemberController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const member = req.body;
        // ? : check if email and password are provided
        if (!member.email || !member.password) {
            return res.status(400).send({
                status: 400,
                message: 'Email and password are required',
            });
        }
        try {
            const result = yield (0, member_service_1.registerMember)(member);
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
            console.error('An error occurred while registering member: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function loginMemberController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const member = req.body;
        // Check if email and password are provided
        if (!member.email || !member.password) {
            return res.status(400).send({
                status: 400,
                message: 'Email and password are required',
            });
        }
        try {
            const result = yield (0, member_service_1.loginMember)(member);
            // ? : check if result doesn't have status or invalid status
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
            console.error('An error occurred while logging in member: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getMembersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, member_service_1.getMembers)();
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
            console.error('An error occurred while getting all members: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getMemberByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid id',
            });
        }
        try {
            const result = yield (0, member_service_1.getMemberById)(id);
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
            console.error('An error occurred while getting member by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateMemberController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid id',
            });
        }
        const member = req.body;
        // ? : check if name, email, password, phone are provided
        if (!member.name || !member.email || !member.password || !member.phone) {
            return res.status(400).send({
                status: 400,
                message: 'Name, email, password, and phone are required',
            });
        }
        try {
            const result = yield (0, member_service_1.updateMember)(id, member);
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
            console.error('An error occurred while updating member: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteMemberController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid id',
            });
        }
        try {
            const result = yield (0, member_service_1.deleteMember)(id);
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
            console.error('An error occurred while deleting member: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
