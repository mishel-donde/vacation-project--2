"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileUploader;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("config"));
const aws_1 = __importDefault(require("../aws/aws"));
async function fileUploader(req, res, next) {
    if (!req.files.vacationImage)
        return next();
    const vacationImage = req.files.vacationImage;
    const upload = new lib_storage_1.Upload({
        client: aws_1.default,
        params: {
            Bucket: config_1.default.get("s3.bucket"),
            Key: `${(0, uuid_1.v4)()}${path_1.default.extname(vacationImage.name)}`,
            Body: vacationImage.data,
            ContentType: vacationImage.mimetype,
        },
    });
    const response = await upload.done();
    req.imageUrl = `${response.Bucket}/${response.Key}`;
    next();
}
