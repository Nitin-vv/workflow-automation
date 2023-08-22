"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./src/routes/auth.route");
const property_route_1 = require("./src/routes/property.route");
const sms_templates_route_1 = require("./src/routes/sms-templates.route");
const email_templates_route_1 = require("./src/routes/email-templates.route");
const workflows_route_1 = require("./src/routes/workflows.route");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ limit: '100mb' }));
const startServer = (port) => {
    app.use(express_1.default.json());
    app.use("/api/auth", auth_route_1.router);
    app.use("/api/property", property_route_1.propertyRouter);
    app.use("/api/sms", sms_templates_route_1.SmsRouter);
    app.use("/api/email", email_templates_route_1.EmailRouter);
    app.use("/api/workflow", workflows_route_1.WorkflowRouter);
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });
};
exports.startServer = startServer;
