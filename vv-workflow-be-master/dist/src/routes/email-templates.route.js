"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRouter = void 0;
const express_1 = __importDefault(require("express"));
const email_templates_controller_1 = require("../controllers/email-templates.controller");
const auth_middleware_1 = __importDefault(require("../middelwares/auth.middleware"));
exports.EmailRouter = express_1.default.Router();
exports.EmailRouter.get('/getEmailTemplates', auth_middleware_1.default, email_templates_controller_1.getEmailTemplates);
exports.EmailRouter.post('/createEmailTemplates', auth_middleware_1.default, email_templates_controller_1.createEmailTemplates);
exports.EmailRouter.put('/updateEmailTemplates', auth_middleware_1.default, email_templates_controller_1.updateEmailTemplates);
exports.EmailRouter.delete('/deleteEmailTemplates', auth_middleware_1.default, email_templates_controller_1.deleteEmailTemplates);
exports.EmailRouter.put('/updateStatus', auth_middleware_1.default, email_templates_controller_1.updateStatus);
