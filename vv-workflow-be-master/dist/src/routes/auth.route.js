"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../middelwares/auth.middleware"));
exports.router = express_1.default.Router();
exports.router.post('/signup', auth_controller_1.signup);
exports.router.post('/login', auth_controller_1.login);
exports.router.get('/userInfo', auth_middleware_1.default, auth_controller_1.userInfo);
exports.router.post('/forgotPassword', auth_controller_1.forgotpassword);
