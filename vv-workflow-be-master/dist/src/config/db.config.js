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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const dbConfig = {
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT, // Type assertion to Dialect
};
const sequelize = new sequelize_1.Sequelize((dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.name) || '', (dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.username) || '', (dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.password) || '', {
    host: (dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.host) || '',
    port: (dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.port) ? Number(dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.port) : undefined,
    dialect: (dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.dialect) || 'mysql',
    pool: { min: 0, max: 5, idle: 10000 },
    logging: false,
});
exports.sequelize = sequelize;
