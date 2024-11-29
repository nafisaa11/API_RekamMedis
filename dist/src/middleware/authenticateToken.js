"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const token_1 = require("../utils/token");
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({
            status: 401,
            message: 'Unauthorized: No token provided',
        });
    }
    else if (!(0, token_1.verifyToken)(token)) {
        return res.status(401).send({
            status: 401,
            message: 'Unauthorized: Invalid token',
        });
    }
    return next();
}
