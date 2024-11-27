"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
const token_1 = require("../utils/token");
function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    try {
        const decodedToken = (0, token_1.decodeToken)(token);
        if (!decodedToken) {
            return res.status(401).send({
                status: 401,
                message: 'Unauthorized: Invalid token',
            });
        }
        if (decodedToken.role !== 'admin' && 'dokter' && 'petugas') {
            return res.status(403).send({
                status: 403,
                message: 'Forbidden: User is not an admin or dokter or petugas',
            });
        }
    }
    catch (error) {
        return res.status(403).send({
            status: 403,
            message: 'Forbidden: Unable to decode token',
        });
    }
    return next();
}
