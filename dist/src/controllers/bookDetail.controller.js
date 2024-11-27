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
exports.getBookDetailsController = getBookDetailsController;
exports.getBookDetailByIdController = getBookDetailByIdController;
exports.createBookDetailController = createBookDetailController;
exports.updateBookDetailController = updateBookDetailController;
exports.deleteBookDetailController = deleteBookDetailController;
const bookDetail_service_1 = require("../service/bookDetail.service");
const response_1 = require("../utils/response");
function getBookDetailsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, bookDetail_service_1.getBookDetails)();
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
            console.error('An error occurred while getting all books detail: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getBookDetailByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid book detail ID',
            });
        }
        try {
            const result = yield (0, bookDetail_service_1.getBookDetailById)(id);
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
            console.error('An error occurred while getting a book detail by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createBookDetailController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        // ? : check if bodyRequest is not a BookDetail
        if (!bodyRequest) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid request body',
            });
        }
        try {
            const result = yield (0, bookDetail_service_1.createBookDetail)(bodyRequest);
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
            console.error('An error occurred while creating a book detail: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateBookDetailController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid book detail ID',
            });
        }
        const bodyRequest = req.body;
        // ? : check if bodyRequest is not a BookDetail
        if (!bodyRequest) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid request body',
            });
        }
        try {
            const result = yield (0, bookDetail_service_1.updateBookDetail)(id, bodyRequest);
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
            console.error('An error occurred while updating a book detail: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteBookDetailController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid book detail ID',
            });
        }
        try {
            const result = yield (0, bookDetail_service_1.deleteBookDetail)(id);
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
            console.error('An error occurred while deleting a book detail: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
