"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userInfo = exports.forgotpassword = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const models_1 = __importDefault(require("../models"));
const messageEnums_1 = require("../enums/messageEnums");
dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'thisisfallbackSecret123456789';
const Users = models_1.default.Users;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, accessTokenSecret, { expiresIn: '1d' });
}
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupAuth = req.body;
    if (signupAuth) {
        const name = signupAuth.name;
        const email = signupAuth.email.toLowerCase();
        const password = signupAuth.password;
        try {
            if (!name || !email || !password)
                throw new Error(messageEnums_1.MessageTag.ALL_REQ);
            const isExists = yield Users.findOne({
                where: { email: email },
            });
            if (!isExists) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hash = yield bcryptjs_1.default.hash(password, salt);
                const isCreated = yield Users.create({
                    name: name,
                    email: email,
                    password: hash,
                });
                if (isCreated) {
                    res.send({
                        status: true,
                        message: messageEnums_1.MessageTag.RegisterSuccess,
                        data: isCreated,
                        statusCode: 200,
                    });
                }
            }
            else {
                res.send({
                    status: false,
                    statusCode: 409,
                    message: messageEnums_1.MessageTag.UserExists
                });
            }
        }
        catch (error) {
            res.send({
                message: messageEnums_1.MessageTag.Error,
                error: error,
                statusCode: 500
            });
        }
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        if (!email || !password)
            throw new Error(messageEnums_1.MessageTag.ALL_REQ);
        const isExists = yield Users.findOne({
            where: { email: email },
            attributes: ['userid', 'accountid', 'name', 'email', 'password', 'role', 'createdAt', 'updatedAt']
        });
        if (isExists) {
            const userid = isExists.dataValues.userid;
            const accountid = isExists.dataValues.accountid;
            const name = isExists.dataValues.name;
            const role = isExists.dataValues.role;
            const hashedPassword = isExists.dataValues.password;
            const isPasswordMatch = yield bcryptjs_1.default.compare(password, hashedPassword);
            if (isPasswordMatch) {
                const token = generateAccessToken({ userid, accountid, name, email, role });
                res.status(200).json({
                    token: token,
                    role: (_a = isExists.dataValues) === null || _a === void 0 ? void 0 : _a.role,
                    statusCode: 200,
                    message: 'Login Successful',
                });
            }
            else {
                return res.status(401).json({
                    statusCode: 401,
                    message: messageEnums_1.MessageTag.WrongCredentials
                });
            }
        }
        else {
            return res.status(404).json({
                statusCode: 404,
                message: messageEnums_1.MessageTag.NoUser
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: messageEnums_1.MessageTag.Error,
            error: error
        });
    }
});
exports.login = login;
const forgotpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const forgotAuth = req.body;
    if (forgotAuth) {
        const email = forgotAuth.email.toLowerCase();
        const password = forgotAuth.password;
        try {
            if (!email)
                throw new Error(messageEnums_1.MessageTag.ALL_REQ);
            const isExists = yield Users.findOne({
                where: { email: email },
            });
            if (isExists) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hash = yield bcryptjs_1.default.hash(password, salt);
                const isUpdated = yield Users.update({
                    password: hash
                }, {
                    where: {
                        email,
                    },
                    returning: true,
                });
                if (isUpdated) {
                    res.send({
                        status: true,
                        statusCode: 200,
                        data: isUpdated,
                        message: messageEnums_1.MessageTag.PasswordUpdated
                    });
                }
            }
            else {
                res.send({
                    status: false,
                    statusCode: 404,
                    message: messageEnums_1.MessageTag.EmailNotFound
                });
            }
        }
        catch (error) {
            res.send({
                statusCode: 500,
                message: messageEnums_1.MessageTag.Error,
                error: error
            });
        }
    }
});
exports.forgotpassword = forgotpassword;
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const authHeader = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization;
    try {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
        if (!token) {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: 'No token provided'
            });
        }
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'thisisfallbackSecret123456789';
        jsonwebtoken_1.default.verify(token, accessTokenSecret, (error, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({
                    status: false,
                    statusCode: 500,
                    message: 'Failed to decode token'
                });
            }
            const userDetails = yield Users.findOne({
                where: { userid: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userid },
            });
            const data = {
                name: userDetails.name,
                email: userDetails.email,
                role: decodedToken.role,
                createdAt: userDetails.createdAt,
                updatedAt: userDetails.updatedAt
            };
            res.send({
                status: true,
                statusCode: 200,
                data: data
            });
        }));
    }
    catch (error) {
        // Handle any other errors that may occur
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: 'An error occurred'
        });
    }
});
exports.userInfo = userInfo;
