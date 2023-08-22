"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsRouter = void 0;
const express_1 = __importDefault(require("express"));
const sms_templates_controller_1 = require("../controllers/sms-templates.controller");
const auth_middleware_1 = __importDefault(require("../middelwares/auth.middleware"));
exports.SmsRouter = express_1.default.Router();
exports.SmsRouter.get('/getSmsTemplates', auth_middleware_1.default, sms_templates_controller_1.getSmsTemplates);
exports.SmsRouter.post('/createSmsTemplates', auth_middleware_1.default, sms_templates_controller_1.createSmsTemplates);
exports.SmsRouter.put('/updateSmsTemplates', auth_middleware_1.default, sms_templates_controller_1.updateSmsTemplates);
exports.SmsRouter.delete('/deleteSmsTemplates', auth_middleware_1.default, sms_templates_controller_1.deleteSmsTemplates);
exports.SmsRouter.put('/updateStatus', auth_middleware_1.default, sms_templates_controller_1.updateStatus);
