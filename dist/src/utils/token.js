"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = require("jsonwebtoken");
function createToken(payload) {
    return (0, jsonwebtoken_1.sign)(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' });
}
function verifyToken(token) {
    try {
        const isValid = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SECRET_KEY);
        if (isValid) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
function decodeToken(token) {
    return (0, jsonwebtoken_1.decode)(token);
}
