"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const server_config_1 = __importDefault(require("./server.config"));
const index_1 = __importDefault(require("../../index"));
const db_config_1 = __importDefault(require("./db.config"));
const connectToDB = () => {
    // Ping database to check for common exception errors.
    db_config_1.default
        .authenticate()
        .then(() => {
        console.info('DB connected successfully !!!!');
        (0, index_1.default)(server_config_1.default);
    })
        .catch((error) => {
        console.log('error while connecting to db', error);
    });
};
exports.default = connectToDB;
