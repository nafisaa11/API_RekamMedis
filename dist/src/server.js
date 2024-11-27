"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const main_1 = __importDefault(require("./main"));
require('dotenv').config();
main_1.default.listen(3000, '0.0.0.0', () => {
    console.log(`Server started at http://localhost:${3000}`);
});
