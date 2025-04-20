"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = enforceAuth;
const app_error_1 = __importDefault(require("../errors/app-error"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("config"));
function enforceAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
        return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "missing authorization header"));
    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2)
        return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "bad authorization header"));
    if (parts[0] !== "Bearer")
        return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "bad authorization header"));
    try {
        const user = (0, jsonwebtoken_1.verify)(parts[1], config_1.default.get("app.jwtSecret"));
        req.user = user;
        next();
    }
    catch (e) {
        next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "invalid JWT"));
    }
}
