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
exports.default = seedAdmins;
const bcrypt_1 = require("bcrypt");
const __1 = __importDefault(require(".."));
const data = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    phone: '123457890',
};
function seedAdmins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, __1.default)();
            if (connection) {
                const [rows] = yield connection.query('SELECT * FROM admins WHERE email = ?', [data.email]);
                // ? : check if there is no admin with the email
                if (rows.length === 0) {
                    const hashedPasswod = yield (0, bcrypt_1.hash)(data.password, 10);
                    yield connection.query('INSERT INTO admins (name, email, password, phone) VALUES (?, ?, ?, ?)', [data.name, data.email, hashedPasswod, data.phone]);
                    console.log(`Admin with email ${data.email} seeded!`);
                }
                else {
                    console.log(`Admin with email ${data.email} already exists!`);
                }
                connection.end();
            }
        }
        catch (error) {
            console.error('Error seeding admins:', error);
        }
    });
}
