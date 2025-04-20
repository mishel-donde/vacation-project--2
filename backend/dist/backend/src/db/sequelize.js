"use strict";
// import { Sequelize } from "sequelize-typescript";
// import config from "config";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { User } from "../models/user";
// import { Follow } from "../models/follow";
// import { Vacation } from "../models/vacation";
// const logging = config.get<boolean>("sequelize.logging") ? console.log : false;
// const sequelize = new Sequelize({
//   models: [User, Vacation, Follow],
//   dialect: "mysql",
//   ...config.get("db"),
//   logging,
// });
// export default sequelize;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("config"));
const user_1 = require("../models/user");
const follow_1 = require("../models/follow");
const vacation_1 = require("../models/vacation");
const logging = config_1.default.get("sequelize.logging") ? console.log : false;
// הוצאת משתנים מה-config
const dbConfig = config_1.default.get("db");
// קונפיגורציה תקינה ל־Sequelize
const sequelize = new sequelize_typescript_1.Sequelize({
    database: dbConfig.name,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
    models: [user_1.User, vacation_1.Vacation, follow_1.Follow],
    logging,
});
exports.default = sequelize;
