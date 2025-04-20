"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/users/controller");
const enforce_auth_1 = __importDefault(require("../middlewares/enforce-auth"));
const role_validation_1 = require("../middlewares/role-validation");
const usersRouter = (0, express_1.Router)();
usersRouter.use(enforce_auth_1.default);
usersRouter.get("/", role_validation_1.adminValidator, controller_1.getAllUsers);
exports.default = usersRouter;
