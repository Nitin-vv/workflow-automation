"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRouter = void 0;
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("../controllers/property.controller");
const auth_middleware_1 = __importDefault(require("../middelwares/auth.middleware"));
exports.propertyRouter = express_1.default.Router();
exports.propertyRouter.get('/getProperties', auth_middleware_1.default, property_controller_1.getProperty);
exports.propertyRouter.post('/createProperties', auth_middleware_1.default, property_controller_1.createProperty);
exports.propertyRouter.put('/updateProperties', auth_middleware_1.default, property_controller_1.updateProperty);
exports.propertyRouter.put('/updatePropertyStatus', auth_middleware_1.default, property_controller_1.updateStatus);
exports.propertyRouter.delete('/deleteProperties', auth_middleware_1.default, property_controller_1.deleteProperty);
