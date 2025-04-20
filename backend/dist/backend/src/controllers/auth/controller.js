"use strict";
// import { NextFunction, Request, Response } from "express";
// import { StatusCodes } from "http-status-codes";
// import { createHmac } from "crypto";
// import config from "config";
// import { sign } from "jsonwebtoken";
// import AppError from "../../errors/app-error";
// import { User } from "../../models/user";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.login = login;
exports.signUp = signUp;
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const user_1 = require("../../models/user");
function hashPassword(password) {
    return (0, crypto_1.createHmac)("sha256", config_1.default.get("app.secret"))
        .update(password)
        .digest("hex");
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await user_1.User.findOne({
            where: {
                email,
                password: hashPassword(password),
            },
        });
        if (!user)
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "The details you provided are incorrect. If you are not registered, please sign up"));
        const jwt = (0, jsonwebtoken_1.sign)(user.get({ plain: true }), config_1.default.get("app.jwtSecret"));
        res.json({ jwt });
    }
    catch (e) {
        next(e);
    }
}
async function signUp(req, res, next) {
    const { firstName, lastName, password, email, role = "user" } = req.body;
    try {
        const user = await user_1.User.create({
            firstName,
            lastName,
            password: hashPassword(password),
            email,
            role,
        });
        const jwt = (0, jsonwebtoken_1.sign)(user.get({ plain: true }), config_1.default.get("app.jwtSecret"));
        res.json({ jwt });
    }
    catch (e) {
        if (e.name === "SequelizeUniqueConstraintErrors")
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.CONFLICT, `The email address "${email}" is taken. Please use a different one .`));
        next(e);
    }
}
