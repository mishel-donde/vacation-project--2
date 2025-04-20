"use strict";
// import express, { json } from "express";
// import config from "config";
// import sequelize from "./db/sequelize";
// import errorLogger from "./middlewares/error/error-logger";
// import errorResponder from "./middlewares/error/error-responder";
// import notFound from "./middlewares/not-found";
// import cors from "cors";
// import authRouter from "./routers/auth";
// import fileUpload from "express-fileupload";
// import { createAppBucketIfNotExist } from "./aws/aws";
// import vacationsRouter from "./routers/vacation";
// import followsRouter from "./routers/follow";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
// const force = config.get<boolean>("sequelize.sync.force");
// const port = config.get<string>("app.port");
// const name = config.get<string>("app.name");
// const app = express();
// export async function start() {
//   await sequelize.sync({ force });
//   await createAppBucketIfNotExist();
//   // basic middleware
//   app.use(cors()); // allow any client to use this server
//   app.use(json()); // a middleware to extract the post data and save it to the request object in case the content type of the request is application/json
//   app.use(fileUpload());
//   app.use("/auth", authRouter);
//   app.use("/vacations", vacationsRouter);
//   app.use("/follows", followsRouter);
//   // special notFound middleware
//   app.use(notFound);
//   // error middlewares
//   app.use(errorLogger);
//   app.use(errorResponder);
//   app.listen(port, () => console.log(`${name} started on port ${port}...`));
// }
// export default app;
const express_1 = __importStar(require("express"));
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("./db/sequelize"));
const error_logger_1 = __importDefault(require("./middlewares/error/error-logger"));
const error_responder_1 = __importDefault(require("./middlewares/error/error-responder"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const aws_1 = require("./aws/aws");
const vacation_1 = __importDefault(require("./routers/vacation"));
const follow_1 = __importDefault(require("./routers/follow"));
const users_1 = __importDefault(require("./routers/users"));
const force = config_1.default.get("sequelize.sync.force");
const app = (0, express_1.default)();
async function start() {
    await sequelize_1.default.sync({ force });
    await (0, aws_1.createAppBucketIfNotExist)();
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)());
    app.use((0, express_fileupload_1.default)());
    app.use("/auth", auth_1.default);
    app.use("/vacations", vacation_1.default);
    app.use("/follows", follow_1.default);
    app.use("/users", users_1.default);
    app.use(not_found_1.default);
    app.use(error_logger_1.default);
    app.use(error_responder_1.default);
}
exports.default = app;
