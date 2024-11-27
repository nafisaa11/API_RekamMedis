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
exports.getShelvesController = getShelvesController;
exports.getShelfByIdController = getShelfByIdController;
exports.createShelfController = createShelfController;
exports.updateShelfController = updateShelfController;
exports.deleteShelfController = deleteShelfController;
const shelf_service_1 = require("../service/shelf.service");
const response_1 = require("../utils/response");
function getShelvesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, shelf_service_1.getShelves)();
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
            console.error('An error occurred while getting all shelves: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getShelfByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid shelf ID',
            });
        }
        try {
            const result = yield (0, shelf_service_1.getShelfById)(id);
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
            console.error('An error occurred while getting a shelf by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createShelfController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        // ? : check if name and description is empty
        if (!bodyRequest.name || !bodyRequest.description) {
            return res.status(400).send({
                status: 400,
                message: 'Name and description are required',
            });
        }
        try {
            const result = yield (0, shelf_service_1.createShelf)(bodyRequest);
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
            console.error('An error occurred while creating a shelf: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateShelfController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid shelf ID',
            });
        }
        const bodyRequest = req.body;
        // ? : check if name and description is empty
        if (!bodyRequest.name || !bodyRequest.description) {
            return res.status(400).send({
                status: 400,
                message: 'Name and description are required',
            });
        }
        try {
            const result = yield (0, shelf_service_1.updateShelf)(id, bodyRequest);
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
            console.error('An error occurred while updating a shelf: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteShelfController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid shelf ID',
            });
        }
        try {
            const result = yield (0, shelf_service_1.deleteShelf)(id);
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
            console.error('An error occurred while deleting a shelf: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
