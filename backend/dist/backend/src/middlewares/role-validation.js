"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidator = adminValidator;
exports.regularUserValidator = regularUserValidator;
const app_error_1 = __importDefault(require("../errors/app-error"));
const http_status_codes_1 = require("http-status-codes");
async function adminValidator(req, res, next) {
    if (req.user.role !== "admin")
        return next(new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'you need to be "admin" for this action'));
    next();
}
async function regularUserValidator(req, res, next) {
    if (req.user.role !== "user")
        return next(new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'you need to be "user" for this action'));
    next();
}
