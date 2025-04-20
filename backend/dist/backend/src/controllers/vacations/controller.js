"use strict";
// import { NextFunction, Request, Response } from "express";
// import AppError from "../../errors/app-error";
// import { StatusCodes } from "http-status-codes";
// import socket from "../../io/io";
// import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
// import { Vacation } from "../../models/vacation";
// import { User } from "../../models/user";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVacations = getAllVacations;
exports.getVacation = getVacation;
exports.createVacation = createVacation;
exports.updateVacation = updateVacation;
exports.removeVacation = removeVacation;
exports.exportFollowersCSV = exportFollowersCSV;
const app_error_1 = __importDefault(require("../../errors/app-error"));
const http_status_codes_1 = require("http-status-codes");
const io_1 = __importDefault(require("../../io/io"));
const socket_enums_1 = __importDefault(require("../../../../lib/socket-enums/src/socket-enums"));
const vacation_1 = require("../../models/vacation");
const user_1 = require("../../models/user");
// Get all vacations (with followers)
async function getAllVacations(req, res, next) {
    try {
        const vacations = await vacation_1.Vacation.findAll({
            include: [
                {
                    model: user_1.User,
                    as: "followers",
                },
            ],
            order: [["startingDate", "ASC"]],
        });
        res.json(vacations);
    }
    catch (e) {
        next(e);
    }
}
// Get one vacation
async function getVacation(req, res, next) {
    try {
        const vacationId = req.params.vacationId;
        const vacation = await vacation_1.Vacation.findByPk(vacationId, {
            include: [
                {
                    model: user_1.User,
                    as: "followers",
                },
            ],
        });
        if (!vacation)
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "The vacation you were trying to fetch does not exist"));
        res.json(vacation);
    }
    catch (e) {
        next(e);
    }
}
// Create new vacation
async function createVacation(req, res, next) {
    try {
        let createParams = Object.assign({}, req.body);
        if (req.imageUrl) {
            const { imageUrl } = req;
            createParams = Object.assign(Object.assign({}, createParams), { imageUrl });
        }
        const newVacation = await vacation_1.Vacation.create(createParams);
        res.json(newVacation);
        io_1.default.emit(socket_enums_1.default.ADD_VACATION, {
            from: req.headers["x-client-id"],
            data: newVacation,
        });
    }
    catch (e) {
        next(e);
    }
}
// Update vacation
async function updateVacation(req, res, next) {
    try {
        let createParams = Object.assign({}, req.body);
        if (req.imageUrl) {
            const { imageUrl } = req;
            createParams = Object.assign(Object.assign({}, createParams), { imageUrl });
        }
        const updatedVacation = await vacation_1.Vacation.findByPk(req.params.vacationId);
        if (!updatedVacation)
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "The vacation you were trying to update does not exist"));
        const { price, endingDate, startingDate, vacationDestination, destination, imageUrl, } = createParams;
        updatedVacation.price = price;
        updatedVacation.endingDate = endingDate;
        updatedVacation.startingDate = startingDate;
        updatedVacation.vacationDestination = vacationDestination;
        updatedVacation.destination = destination;
        if (imageUrl) {
            updatedVacation.imageUrl = imageUrl;
        }
        await updatedVacation.save();
        await updatedVacation.reload({
            include: [
                {
                    model: user_1.User,
                    as: "followers",
                },
            ],
        });
        res.json(updatedVacation);
        io_1.default.emit(socket_enums_1.default.UPDATE_VACATION, {
            from: req.headers["x-client-id"],
            data: updatedVacation,
        });
    }
    catch (e) {
        next(e);
    }
}
// Remove vacation
async function removeVacation(req, res, next) {
    try {
        const { vacationId } = req.params;
        const deletedRows = await vacation_1.Vacation.destroy({
            where: { vacationId: vacationId },
        });
        if (deletedRows === 0)
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "The vacation you were trying to delete does not exist"));
        res.json({
            success: true,
        });
        io_1.default.emit(socket_enums_1.default.REMOVE_VACATION, {
            from: req.headers["x-client-id"],
            data: { vacationId: vacationId },
        });
    }
    catch (e) {
        next(e);
    }
}
// Export CSV for followers
async function exportFollowersCSV(req, res, next) {
    try {
        const vacations = await vacation_1.Vacation.findAll({
            include: [
                {
                    model: user_1.User,
                    as: "followers",
                    attributes: ["userId"],
                },
            ],
            order: [["destination", "ASC"]],
        });
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=vacation_followers.csv");
        res.write("Destination,Followers\n");
        vacations.forEach((vacation) => {
            const safeDestination = vacation.destination.includes(",")
                ? `"${vacation.destination}"`
                : vacation.destination;
            res.write(`${safeDestination},${vacation.followers.length}\n`);
        });
        res.end();
    }
    catch (e) {
        next(e);
    }
}
