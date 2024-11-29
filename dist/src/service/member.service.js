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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMember = registerMember;
exports.loginMember = loginMember;
exports.getMembers = getMembers;
exports.getMemberById = getMemberById;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
const bcrypt_1 = require("bcrypt");
const database_1 = __importDefault(require("../database"));
const token_1 = require("../utils/token");
function registerMember(bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rowsEmail] = yield db.query('SELECT * FROM members WHERE email = ?', [bodyRequest.email]);
            // ? : check if member with email already exists
            if (rowsEmail.length > 0) {
                return {
                    status: 409,
                    message: `Email ${bodyRequest.email} already exists!`,
                };
            }
            const [rowsPhone] = yield db.query('SELECT * FROM members WHERE phone = ?', [bodyRequest.phone]);
            // ? : check if member with phone already exists
            if (rowsPhone.length > 0) {
                return {
                    status: 409,
                    message: `Phone ${bodyRequest.phone} already exists!`,
                };
            }
            // ! : hash the password
            const hashedPassword = yield (0, bcrypt_1.hash)(bodyRequest.password, 10);
            // ? : insert the member
            const [result] = yield db.query(`
        INSERT INTO members (
          name,
          email,
          password,
          member_type,
          parent_number,
          phone,
          major,
          department
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
                bodyRequest.name,
                bodyRequest.email,
                hashedPassword,
                bodyRequest.member_type,
                bodyRequest.parent_number,
                bodyRequest.phone,
                bodyRequest.major,
                bodyRequest.department,
            ]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to register member',
                };
            }
            // ! return the member
            return {
                status: 201,
                message: 'Member registered successfully',
            };
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function loginMember(bodyReqeust) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rowsEmail] = yield db.query('SELECT * FROM members WHERE email = ?', [bodyReqeust.email]);
            // ? : check if member with email exists
            if (rowsEmail.length === 0) {
                return {
                    status: 401,
                    message: `Email is incorrect!`,
                };
            }
            // ! : compare the password
            const member = rowsEmail[0];
            const isPasswordMatch = yield (0, bcrypt_1.compare)(bodyReqeust.password, rowsEmail[0].password);
            // ? : check if the password is incorrect
            if (!isPasswordMatch) {
                return {
                    status: 401,
                    message: 'Password is incorrect!',
                };
            }
            // ! : create a token
            const token = (0, token_1.createToken)({
                id: member.id,
                name: member.name,
                email: member.email,
                role: 'user',
            });
            // ! : return the member
            return {
                status: 200,
                message: 'Login successful',
                payload: {
                    id: member.id,
                    name: member.name,
                    email: member.email,
                    member_type: member.member_type,
                    parent_number: member.parent_number,
                    phone: member.phone,
                    address: member.address,
                    major: member.major,
                    department: member.department,
                    token,
                },
            };
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function getMembers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM members');
            // ? : check if the members are found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Members not found',
                };
            }
            // ! : return the members
            return {
                status: 200,
                message: 'Members fetched successfully',
                payload: rows.map((_a) => {
                    var { password } = _a, rest = __rest(_a, ["password"]);
                    return rest;
                }),
            };
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function getMemberById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM members WHERE id = ?', [id]);
            // ? : check if the member is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Member not found',
                };
            }
            // ! : return the member
            return {
                status: 200,
                message: 'Member fetched successfully',
                payload: rows[0],
            };
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function updateMember(id, bodyRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM members WHERE id = ?', [id]);
            // ? : check if the member is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Member not found',
                };
            }
            // ! : update the member
            const [result] = yield db.query(`
        UPDATE members SET
        name = ?,
        email = ?,
        phone = ?,
        address = ?,
        WHERE id = ?
      `, [
                bodyRequest.name,
                bodyRequest.email,
                bodyRequest.phone,
                bodyRequest.address,
                id,
            ]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to update member',
                };
            }
            // ! : return the member
            return {
                status: 200,
                message: 'Member updated successfully',
            };
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
function deleteMember(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.default)();
        // ? : check if the database connection is successful
        if (!db)
            throw new Error('Cannot connect to database');
        try {
            const [rows] = yield db.query('SELECT * FROM members WHERE id = ?', [id]);
            // ? : check if the member is found
            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Member not found',
                };
            }
            // ! : delete the member
            const [result] = yield db.query('DELETE FROM members WHERE id = ?', [id]);
            // ? : check if the result is empty
            if (result.affectedRows === 0) {
                return {
                    status: 500,
                    message: 'Failed to delete member',
                };
            }
            // ! : return the member
            return {
                status: 200,
                message: `Member ${rows} deleted successfully`,
            };
        }
        catch (error) {
            console.error('Database query error:', error);
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
        finally {
            yield db.end();
        }
    });
}
