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
exports.default = seedLibraryProfile;
const __1 = __importDefault(require(".."));
const data = {
    name: 'Book Hive',
    address: 'Kampus PENS',
    phone: '1234567890',
    email: 'bookhive@pens.ac.id',
    year_established: new Date().getFullYear(),
};
function seedLibraryProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, __1.default)();
            if (connection) {
                const [rows] = yield connection.query('SELECT * FROM library_profile WHERE email = ?', [
                    data.email,
                ]);
                // ? : check if there is no library profile with the email
                if (rows.length === 0) {
                    yield connection.query('INSERT INTO library_profile (name, address, phone, email, year_established) VALUES (?, ?, ?, ?, ?)', [
                        data.name,
                        data.address,
                        data.phone,
                        data.email,
                        data.year_established,
                    ]);
                    console.log(`Library profile with email ${data.email} seeded!`);
                }
                else {
                    console.log(`Library profile with email ${data.email} already exists!`);
                }
                connection.end();
            }
        }
        catch (error) {
            console.error('Error seeding library profile:', error);
        }
    });
}
