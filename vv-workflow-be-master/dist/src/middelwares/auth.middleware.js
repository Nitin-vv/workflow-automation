"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isUserAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res
                .status(403)
                .send({ error: true, message: "A token is required for authentication" });
        }
        const tokenArr = authHeader.split(" ");
        const jwtToken = tokenArr[1];
        if (!jwtToken) {
            return res
                .status(403)
                .send({ error: true, message: "A token is required for authentication" });
        }
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return { message: "token expired" };
                }
                throw err;
            }
            return decoded;
        });
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.message) === "token expired") {
            return res.status(401).send({
                error: true,
                message: "Token has expired, please log in again!"
            });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).send({ error: true, message: "Invalid Token" });
    }
};
exports.default = isUserAuthenticated;
