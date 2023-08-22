"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
const db = {};
// db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
db.Users = require('../models/signup.model')(db_config_1.sequelize, sequelize_1.DataTypes);
db.Property = require('../models/property.model')(db_config_1.sequelize, sequelize_1.DataTypes);
db.SMS = require('../models/sms-templates.model')(db_config_1.sequelize, sequelize_1.DataTypes);
db.EMAIL = require('../models/email-templates.model')(db_config_1.sequelize, sequelize_1.DataTypes);
db.WORKFLOW = require('../models/workflows.model')(db_config_1.sequelize, sequelize_1.DataTypes);
exports.default = db;
