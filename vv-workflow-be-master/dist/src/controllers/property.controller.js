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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateStatus = exports.updateProperty = exports.createProperty = exports.getProperty = void 0;
const dotenv = __importStar(require("dotenv"));
const models_1 = __importDefault(require("../models"));
const messageEnums_1 = require("../enums/messageEnums");
const sequelize_1 = require("sequelize");
dotenv.config();
const Property = models_1.default.Property;
function calculateSkip(page, pageSize) {
    let skip;
    skip = ((page - 1) * pageSize);
    return skip;
}
const getProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountid, userid } = req.user;
    let { page, per_page, search, order_dir, order_by } = req.query;
    per_page = parseInt(per_page) || 10;
    page = parseInt(page) || 1;
    try {
        const options = {
            where: {
                userid,
                accountid,
            },
            limit: per_page,
            offset: calculateSkip(page, per_page),
        };
        // Add search condition if 'search' query parameter is provided
        if (search) {
            options.where[sequelize_1.Op.or] = [
                {
                    title: {
                        [sequelize_1.Op.like]: `%${search}%`,
                    },
                },
            ];
        }
        // Add sorting conditions if 'order_dir' and 'order_by' query parameters are provided
        if (order_dir && order_by) {
            const orderColumn = order_by ? order_by : 'createdAt'; // Change the column name based on your requirements
            const sortOrder = order_dir ? order_dir : 'DESC';
            options.order = [[orderColumn, sortOrder]];
        }
        const { count, rows } = yield Property.findAndCountAll(options);
        const properties = rows.map((property) => {
            const _a = property.toJSON(), { userid, accountid } = _a, rest = __rest(_a, ["userid", "accountid"]);
            return rest;
        });
        const response = {
            status: true,
            statusCode: 200,
            data: properties || [],
            meta: {
                current_page: page,
                from: (page - 1) * per_page + 1,
                last_page: Math.ceil(count / per_page),
                path: req.originalUrl,
                per_page: per_page.toString(),
                to: Math.min(page * per_page, count),
                total: count,
            },
        };
        res.send(response);
    }
    catch (error) {
        console.log('error', error);
        res.send({
            statusCode: 500,
            message: messageEnums_1.MessageTag.Error,
            error: error,
        });
    }
});
exports.getProperty = getProperty;
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountid, userid } = req.user;
    const createproperty = req.body;
    if (createproperty) {
        const payload = {
            userid: userid,
            accountid: accountid,
            title: createproperty.title,
            type: createproperty.type,
            regex: createproperty.regex,
            status: createproperty.status
        };
        try {
            if (!userid || !accountid || !payload.title || !payload.type) {
                return res.status(403).json({
                    error: true,
                    message: 'All Field Are required'
                });
            }
            const isExists = yield Property.findOne({
                where: {
                    userid: userid,
                    accountid: accountid,
                    title: payload.title
                },
            });
            if (isExists) {
                return res.status(403).json({
                    error: true,
                    message: 'Property Already Exists'
                });
            }
            const isCreated = yield Property.create(payload);
            if (isCreated) {
                res.send({
                    status: true,
                    message: 'Property created Successfully',
                    data: isCreated,
                    statusCode: 200,
                });
            }
        }
        catch (error) {
            res.send({
                message: messageEnums_1.MessageTag.Error,
                error: error,
                statusCode: 500
            });
        }
    }
});
exports.createProperty = createProperty;
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountid, userid } = req.user;
    const updateProperty = req.body;
    if (updateProperty) {
        const id = updateProperty.id;
        const title = updateProperty === null || updateProperty === void 0 ? void 0 : updateProperty.title;
        const type = updateProperty === null || updateProperty === void 0 ? void 0 : updateProperty.type;
        const regex = updateProperty === null || updateProperty === void 0 ? void 0 : updateProperty.regex;
        const status = updateProperty === null || updateProperty === void 0 ? void 0 : updateProperty.status;
        try {
            const isExists = yield Property.findOne({
                where: {
                    userid: userid,
                    accountid: accountid,
                    id: id
                },
            });
            if (!isExists) {
                res.send({
                    statusCode: 404,
                    message: messageEnums_1.MessageTag.NoUser
                });
            }
            else {
                const isUpdated = yield Property.update({
                    title,
                    type,
                    regex,
                    status,
                    updatedAt: new Date(),
                }, {
                    where: {
                        userid: userid,
                        accountid: accountid,
                        id: id
                    },
                    returning: true,
                });
                const updatedUser = yield Property.findOne({
                    where: {
                        userid: userid,
                        accountid: accountid,
                        id: id
                    },
                });
                if (isUpdated) {
                    let data = {
                        id: updatedUser.id,
                        title: updatedUser.title,
                        type: updatedUser.type,
                        status: updatedUser.status,
                        regex: updatedUser.regex,
                        createdAt: updatedUser.createdAt,
                        updatedAt: updatedUser.updatedAt,
                    };
                    res.send({
                        statusCode: 200,
                        message: 'User Updated Successfully',
                        data: data
                    });
                }
            }
        }
        catch (error) {
            res.send({
                message: messageEnums_1.MessageTag.Error,
                error: error
            });
        }
    }
});
exports.updateProperty = updateProperty;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountid, userid } = req.user;
    const updateProperty = req.body;
    if (updateProperty) {
        const id = updateProperty.id;
        const status = updateProperty === null || updateProperty === void 0 ? void 0 : updateProperty.status;
        try {
            const isExists = yield Property.findOne({
                where: {
                    userid: userid,
                    accountid: accountid,
                    id: id
                },
            });
            if (!isExists) {
                res.send({
                    statusCode: 404,
                    message: messageEnums_1.MessageTag.NoUser
                });
            }
            else {
                const isUpdated = yield Property.update({
                    status,
                    updatedAt: new Date(),
                }, {
                    where: {
                        userid: userid,
                        accountid: accountid,
                        id: id
                    },
                    returning: true,
                });
                const updatedUser = yield Property.findOne({
                    where: {
                        userid: userid,
                        accountid: accountid,
                        id: id
                    },
                });
                if (isUpdated) {
                    let data = {
                        id: updatedUser.id,
                        title: updatedUser.title,
                        type: updatedUser.type,
                        status: updatedUser.status,
                        regex: updatedUser.regex,
                        createdAt: updatedUser.createdAt,
                        updatedAt: updatedUser.updatedAt,
                    };
                    res.send({
                        statusCode: 200,
                        message: 'Status Updated Successfully',
                        data: data
                    });
                }
            }
        }
        catch (error) {
            res.send({
                message: error,
                error: error
            });
        }
    }
});
exports.updateStatus = updateStatus;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ids = req.query.Ids;
    const { accountid, userid } = req.user;
    try {
        ids = ids.split(',').map(Number);
        const isDeleted = yield Property.destroy({
            where: {
                id: {
                    [sequelize_1.Op.in]: ids,
                },
                userid: userid,
                accountid: accountid
            },
        });
        if (isDeleted) {
            res.status(200).json({
                status: true,
                statusCode: 200,
                message: 'Properties deleted successfully',
                data: isDeleted,
            });
        }
        else {
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: 'Properties not found',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: 'An error occurred',
        });
    }
});
exports.deleteProperty = deleteProperty;
