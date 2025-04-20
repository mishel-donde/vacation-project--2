"use strict";
// import { Router } from "express";
// import {
//   createVacation,
//   exportFollowersCSV,
//   getAllVacations,
//   getVacation,
//   removeVacation,
//   updateVacation,
// } from "../controllers/vacations/controller";
// import paramsValidation from "../middlewares/params-validation";
// import {
//   newVacationFilesValidator,
//   newVacationValidator,
//   updateVacationFilesValidator,
//   UpdateVacationValidator,
//   vacationIdValidator,
// } from "../controllers/vacations/validator";
// import validation from "../middlewares/validation";
// import enforceAuth from "../middlewares/enforce-auth";
// import fileUploader from "../middlewares/file-uploader";
// import { adminValidator } from "../middlewares/role-validation";
// import filesValidation from "../middlewares/file-validation";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const vacationsRouter = Router();
// vacationsRouter.use(enforceAuth);
// vacationsRouter.get("/reports/followers", adminValidator, exportFollowersCSV);
// vacationsRouter.get("/", getAllVacations);
// vacationsRouter.get(
//   "/:vacationId",
//   adminValidator,
//   paramsValidation(vacationIdValidator),
//   getVacation
// );
// vacationsRouter.post(
//   "/",
//   adminValidator,
//   validation(newVacationValidator),
//   filesValidation(newVacationFilesValidator),
//   fileUploader,
//   createVacation
// );
// vacationsRouter.delete(
//   "/:vacationId",
//   adminValidator,
//   paramsValidation(vacationIdValidator),
//   removeVacation
// );
// vacationsRouter.patch(
//   "/:vacationId",
//   adminValidator,
//   paramsValidation(vacationIdValidator),
//   validation(UpdateVacationValidator),
//   filesValidation(updateVacationFilesValidator),
//   fileUploader,
//   updateVacation
// );
// export default vacationsRouter;
const express_1 = require("express");
const controller_1 = require("../controllers/vacations/controller");
const params_validation_1 = __importDefault(require("../middlewares/params-validation"));
const validator_1 = require("../controllers/vacations/validator");
const validation_1 = __importDefault(require("../middlewares/validation"));
const enforce_auth_1 = __importDefault(require("../middlewares/enforce-auth"));
const file_uploader_1 = __importDefault(require("../middlewares/file-uploader"));
const role_validation_1 = require("../middlewares/role-validation");
const file_validation_1 = __importDefault(require("../middlewares/file-validation"));
const vacationsRouter = (0, express_1.Router)();
vacationsRouter.use(enforce_auth_1.default);
// דוחות של עוקבים לחופשות
vacationsRouter.get("/reports/followers", role_validation_1.adminValidator, controller_1.exportFollowersCSV);
// כל החופשות
vacationsRouter.get("/", controller_1.getAllVacations);
// חופשה בודדת (מצפים לקבל vacationId)
vacationsRouter.get("/:vacationId", role_validation_1.adminValidator, (0, params_validation_1.default)(validator_1.vacationIdValidator), controller_1.getVacation // הקונטרולר שמבצע את השאילתה
);
// יצירת חופשה חדשה
vacationsRouter.post("/", role_validation_1.adminValidator, (0, validation_1.default)(validator_1.newVacationValidator), (0, file_validation_1.default)(validator_1.newVacationFilesValidator), file_uploader_1.default, // אוגרים את הקובץ
controller_1.createVacation);
// מחיקת חופשה לפי vacationId
vacationsRouter.delete("/:vacationId", role_validation_1.adminValidator, (0, params_validation_1.default)(validator_1.vacationIdValidator), controller_1.removeVacation);
// עדכון חופשה קיימת
vacationsRouter.patch("/:vacationId", role_validation_1.adminValidator, (0, params_validation_1.default)(validator_1.vacationIdValidator), (0, validation_1.default)(validator_1.UpdateVacationValidator), (0, file_validation_1.default)(validator_1.updateVacationFilesValidator), file_uploader_1.default, controller_1.updateVacation);
exports.default = vacationsRouter;
