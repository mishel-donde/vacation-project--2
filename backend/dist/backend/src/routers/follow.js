"use strict";
// import { Router } from "express";
// import enforceAuth from "../middlewares/enforce-auth";
// import {
//   followVacation,
//   unfollowVacation,
// } from "../controllers/follows/controller";
// import paramsValidation from "../middlewares/params-validation";
// import { regularUserValidator } from "../middlewares/role-validation";
// import { followsVacationIdValidator } from "../controllers/follows/validator";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followsRouter = void 0;
// const followsRouter = Router();
// followsRouter.use(enforceAuth);
// followsRouter.post(
//   "/follow/:vacationId",
//   regularUserValidator,
//   paramsValidation(followsVacationIdValidator),
//   followVacation
// );
// followsRouter.delete(
//   "/unfollow/:vacationId",
//   regularUserValidator,
//   paramsValidation(followsVacationIdValidator),
//   unfollowVacation
// );
// export default followsRouter;
const express_1 = require("express");
const enforce_auth_1 = __importDefault(require("../middlewares/enforce-auth"));
const controller_1 = require("../controllers/follows/controller");
const params_validation_1 = __importDefault(require("../middlewares/params-validation"));
const role_validation_1 = require("../middlewares/role-validation");
const validator_1 = require("../controllers/follows/validator");
exports.followsRouter = (0, express_1.Router)();
exports.followsRouter.use(enforce_auth_1.default);
// להסרת עוקב מחופשה
exports.followsRouter.delete("/unfollow/:vacationId", role_validation_1.regularUserValidator, (0, params_validation_1.default)(validator_1.followsVacationIdValidator), controller_1.unfollowVacation);
exports.default = exports.followsRouter;
