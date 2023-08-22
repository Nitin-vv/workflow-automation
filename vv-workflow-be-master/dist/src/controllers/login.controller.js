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
exports.signup = void 0;
// import bcrypt from 'bcrypt';
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = __importDefault(require("../models"));
const messageEnums_1 = require("../enums/messageEnums");
const SignUp = models_1.default.SignUp;
// Use the `isEmpty` function in your TypeScript code
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupAuth = req.body;
    if (signupAuth) {
        const id = (0, uuid_1.v4)();
        const name = signupAuth.name;
        const email = signupAuth.email;
        const password = signupAuth.password;
        try {
            if (!name || !email || !password)
                throw new Error(messageEnums_1.MessageTag.ALL_REQ);
            const isExists = yield SignUp.findOne({
                where: { email: email },
            });
            if (!isExists) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hash = yield bcryptjs_1.default.hash(password, salt);
                const isCreated = yield SignUp.create({
                    id: id,
                    name: name,
                    email: email,
                    password: hash,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                console.log('isCreated', isCreated);
                if (isCreated) {
                    res.status(200).json({
                        status: true,
                        message: 'success',
                        data: isCreated,
                        statusCode: 200,
                    });
                }
            }
            else {
                res.status(409).json({
                    status: false,
                    message: 'User already exists.',
                });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error });
        }
    }
});
exports.signup = signup;
