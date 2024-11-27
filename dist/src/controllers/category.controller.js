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
exports.getCategoriesController = getCategoriesController;
exports.getCategoryByIdController = getCategoryByIdController;
exports.createCategoryController = createCategoryController;
exports.updateCategoryController = updateCategoryController;
exports.deleteCategoryController = deleteCategoryController;
const category_service_1 = require("../service/category.service");
const response_1 = require("../utils/response");
function getCategoriesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, category_service_1.getCategories)();
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
            console.error('An error occurred while getting all categories: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function getCategoryByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid category ID',
            });
        }
        try {
            const result = yield (0, category_service_1.getCategoryById)(id);
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
            console.error('An error occurred while getting a category by id: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function createCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyRequest = req.body;
        // ? : check if name is empty
        if (!bodyRequest.name) {
            return res.status(400).send({
                status: 400,
                message: 'Category name is required',
            });
        }
        try {
            const result = yield (0, category_service_1.createCategory)(bodyRequest);
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
            console.error('An error occurred while creating a category: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function updateCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid category ID',
            });
        }
        const bodyRequest = req.body;
        // ? : check if name is empty
        if (!bodyRequest.name) {
            return res.status(400).send({
                status: 400,
                message: 'Category name is required',
            });
        }
        try {
            const result = yield (0, category_service_1.updateCategory)(id, bodyRequest);
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
            console.error('An error occurred while updating a category: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
function deleteCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // ? : check if id is not a number
        if (isNaN(id)) {
            return res.status(400).send({
                status: 400,
                message: 'Invalid category ID',
            });
        }
        try {
            const result = yield (0, category_service_1.deleteCategory)(id);
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
            console.error('An error occurred while deleting a category: ', error);
            return res.status(response_1.serverError.status).send(response_1.serverError);
        }
    });
}
