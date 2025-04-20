"use strict";
// import { NextFunction, Request, Response } from "express";
// import AppError from "../../errors/app-error";
// import { StatusCodes } from "http-status-codes";
// import socket from "../../io/io";
// import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
// import { Follow } from "../../models/follow";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followVacation = followVacation;
exports.unfollowVacation = unfollowVacation;
const follow_1 = require("../../models/follow");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const http_status_codes_1 = require("http-status-codes");
const io_1 = __importDefault(require("../../io/io"));
const socket_enums_1 = __importDefault(require("../../../../lib/socket-enums/src/socket-enums"));
const vacation_1 = require("../../models/vacation");
// Follow Vacation
async function followVacation(req, res, next) {
    try {
        const user = req.user;
        const userId = user.userId;
        const { vacationId } = req.params;
        // בדוק אם החופשה קיימת
        const vacation = await vacation_1.Vacation.findByPk(vacationId);
        if (!vacation) {
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Vacation not found"));
        }
        // בדוק אם המשתמש כבר עוקב אחרי החופשה
        const existingFollow = await follow_1.Follow.findOne({
            where: { userId, vacationId },
        });
        if (existingFollow) {
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Already following this vacation"));
        }
        // צור עוקב חדש
        const newFollowVacation = await follow_1.Follow.create({ userId, vacationId });
        res.json(newFollowVacation);
        // Emit Socket Message
        io_1.default.emit(socket_enums_1.default.FOLLOW_VACATION, {
            from: req.headers["x-client-id"],
            data: { vacationId, user },
        });
    }
    catch (err) {
        next(err);
    }
}
// Unfollow Vacation
async function unfollowVacation(req, res, next) {
    try {
        const user = req.user;
        const userId = user.userId;
        const { vacationId } = req.params;
        // בדוק אם החופשה קיימת
        const vacation = await vacation_1.Vacation.findByPk(vacationId);
        if (!vacation) {
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Vacation not found"));
        }
        // הסר עוקב אם הוא קיים
        const unfollowVacation = await follow_1.Follow.destroy({
            where: { userId, vacationId },
        });
        if (!unfollowVacation) {
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User is not following this vacation"));
        }
        res.json({ success: true });
        // Emit Socket Message
        io_1.default.emit(socket_enums_1.default.UNFOLLOW_VACATION, {
            from: req.headers["x-client-id"],
            data: { vacationId, user },
        });
    }
    catch (err) {
        next(err);
    }
}
