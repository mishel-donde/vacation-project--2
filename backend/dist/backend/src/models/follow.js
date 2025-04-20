"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const vacation_1 = require("./vacation");
const controller_1 = require("../controllers/follows/controller");
const validator_1 = require("../controllers/follows/validator");
const params_validation_1 = __importDefault(require("../middlewares/params-validation"));
const role_validation_1 = require("../middlewares/role-validation");
const follow_1 = require("../routers/follow");
let Follow = class Follow extends sequelize_typescript_1.Model {
};
exports.Follow = Follow;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Follow.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => vacation_1.Vacation),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Follow.prototype, "vacationId", void 0);
exports.Follow = Follow = __decorate([
    (0, sequelize_typescript_1.Table)({
        underscored: true,
    })
], Follow);
// למעקב אחרי חופשה
follow_1.followsRouter.post("/follow/:vacationId", role_validation_1.regularUserValidator, (0, params_validation_1.default)(validator_1.followsVacationIdValidator), controller_1.followVacation);
