"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const config_1 = __importDefault(require("config"));
const socket = (0, socket_io_client_1.default)(config_1.default.get("io.url"));
exports.default = socket;
