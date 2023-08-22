"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const server_config_1 = require("../config/server.config");
const db_config_1 = require("../config/db.config");
const connectToDB = () => {
    // Ping database to check for common exception errors.
    db_config_1.sequelize
        .authenticate()
        .then(() => {
        console.info('DB connected successfully!!!!');
        (0, app_1.startServer)(server_config_1.config.port);
    })
        .catch((error) => {
        console.log('error while connecting to db', error);
    });
};
exports.default = connectToDB;
