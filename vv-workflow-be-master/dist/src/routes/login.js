"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/login.controller");
exports.router = express_1.default.Router();
exports.router.post('/signup', login_controller_1.signup);
