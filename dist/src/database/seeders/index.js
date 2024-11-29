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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
const libraryProfile_1 = __importDefault(require("./libraryProfile"));
const __1 = __importDefault(require(".."));
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, __1.default)();
        if (connection) {
            yield (0, admin_1.default)();
            yield (0, libraryProfile_1.default)();
            connection.end();
        }
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
});
seedDatabase();
