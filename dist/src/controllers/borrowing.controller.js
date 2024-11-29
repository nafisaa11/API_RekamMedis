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
exports.getBorrowingsController = getBorrowingsController;
exports.getBorrowingByIdController = getBorrowingByIdController;
exports.getBorrowingsByMemberController = getBorrowingsByMemberController;
exports.getBorrowingsLateController = getBorrowingsLateController;
exports.createBorrowingController = createBorrowingController;
exports.returnBorrowingController = returnBorrowingController;
exports.updateBorrowingController = updateBorrowingController;
exports.deleteBorrowingController = deleteBorrowingController;
const borrowing_service_1 = require("../service/borrowing.service");
const response_1 = require("../utils/response");
function getBorrowingsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, borrowing_service_1.getBorrowings)();
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
            console.error('An error occurred while getting all borrowings: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBorrowingByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid borrowing ID',
            });
        }
        try {
            const result = yield (0, borrowing_service_1.getBorrowingById)(id);
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
            console.error('An error occurred while getting a borrowing by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBorrowingsByMemberController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberId = Number(req.params.id);
        // ? : check if memberId is not a number
        if (isNaN(memberId)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid member ID',
            });
        }
        try {
            const result = yield (0, borrowing_service_1.getBorrowingByMemberId)(memberId);
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
            console.error('An error occurred while getting borrowings by member ID: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBorrowingsLateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, borrowing_service_1.getBorrowingsLate)();
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
            console.error('An error occurred while getting late borrowings: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createBorrowingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        // ? : check if bodyRequest is not a Borrowing
        if (!bodyRequest) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid request body',
            });
        }
        try {
            const result = yield (0, borrowing_service_1.createBorrowing)(bodyRequest);
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
            console.error('An error occurred while creating a borrowing: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function returnBorrowingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid borrowing ID',
            });
        }
        try {
            const result = yield (0, borrowing_service_1.returnBorrowing)(id);
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
            console.error('An error occurred while returning a borrowing: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateBorrowingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid borrowing ID',
            });
        }
        const bodyRequest = req.body;
        // ? : check if bodyRequest is not a Borrowing
        if (!bodyRequest) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid request body',
            });
        }
        try {
            const result = yield (0, borrowing_service_1.updateBorrowing)(id, bodyRequest);
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
            console.error('An error occurred while updating a borrowing: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteBorrowingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid borrowing ID',
            });
        }
        try {
            const result = yield (0, borrowing_service_1.deleteBorrowing)(id);
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
            console.error('An error occurred while deleting a borrowing: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
