"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppBucketIfNotExist = createAppBucketIfNotExist;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("config"));
// read the config of s3, and clone it deeply
const s3Config = JSON.parse(JSON.stringify(config_1.default.get("s3.connection")));
// if we're NOT running localstack, i.e. we want to run against AWS PRODUCTION servers
// then we MUST delete the `endpoint` property from the config object
if (!config_1.default.get("s3.isLocalstack"))
    delete s3Config.endpoint;
// init the client
const s3Client = new client_s3_1.S3Client(s3Config);
async function createAppBucketIfNotExist() {
    try {
        await s3Client.send(new client_s3_1.CreateBucketCommand({
            Bucket: config_1.default.get("s3.bucket"),
        }));
    }
    catch (e) {
        // ignore
        console.log("Bucket probably already exist");
    }
}
exports.default = s3Client;
