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
exports.getStocksController = getStocksController;
exports.getStockByIdController = getStockByIdController;
exports.createStockController = createStockController;
exports.updateStockController = updateStockController;
exports.deleteStockController = deleteStockController;
const stock_service_1 = require("../service/stock.service");
const response_1 = require("../utils/response");
function getStocksController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, stock_service_1.getStocks)();
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
            console.error('An error occurred while getting all stocks: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getStockByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid stock ID',
            });
        }
        try {
            const result = yield (0, stock_service_1.getStockById)(id);
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
            console.error('An error occurred while getting a stock by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        // ? : check if books_id and quantity is empty and not a number
        if (!bodyRequest.books_id ||
            !bodyRequest.quantity ||
            isNaN(bodyRequest.books_id) ||
            isNaN(bodyRequest.quantity)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid stock data',
            });
        }
        try {
            const result = yield (0, stock_service_1.createStock)(bodyRequest);
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
            console.error('An error occurred while creating a stock: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid stock ID',
            });
        }
        const bodyRequest = req.body;
        // ? : check if books_id and quantity is empty and not a number
        if (!bodyRequest.books_id ||
            !bodyRequest.quantity ||
            typeof bodyRequest.books_id !== 'number' ||
            typeof bodyRequest.quantity !== 'number') {
            return res.status(400).send({
                status: 400,
                message: 'Invalid stock data',
            });
        }
        try {
            const result = yield (0, stock_service_1.updateStock)(id, bodyRequest);
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
            console.error('An error occurred while updating a stock: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid stock ID',
            });
        }
        try {
            const result = yield (0, stock_service_1.deleteStock)(id);
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
            console.error('An error occurred while deleting a stock: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
