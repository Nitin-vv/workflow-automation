"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowRouter = void 0;
const express_1 = __importDefault(require("express"));
const workflows_controller_1 = require("../controllers/workflows.controller");
const auth_middleware_1 = __importDefault(require("../middelwares/auth.middleware"));
exports.WorkflowRouter = express_1.default.Router();
exports.WorkflowRouter.get('/getWorkflow', auth_middleware_1.default, workflows_controller_1.getWorkflow);
exports.WorkflowRouter.post('/createWorkflow', auth_middleware_1.default, workflows_controller_1.createWorkflow);
exports.WorkflowRouter.put('/updateWorkflow', auth_middleware_1.default, workflows_controller_1.updateWorkflow);
exports.WorkflowRouter.delete('/deleteWorkflow', auth_middleware_1.default, workflows_controller_1.deleteWorkflow);
exports.WorkflowRouter.put('/updateStatus', auth_middleware_1.default, workflows_controller_1.updateStatus);
