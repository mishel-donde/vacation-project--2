"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filesValidation;
const app_error_1 = __importDefault(require("../errors/app-error"));
const http_status_codes_1 = require("http-status-codes");
function filesValidation(validator) {
    return async function (req, res, next) {
        try {
            req.files = await validator.validateAsync(req.files || {});
            next();
        }
        catch (e) {
            next(new app_error_1.default(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, e.message));
        }
    };
}
