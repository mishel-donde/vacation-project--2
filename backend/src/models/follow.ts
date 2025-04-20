import {
  ForeignKey,
  Column,
  DataType,
  Table,
  Model,
  PrimaryKey,
} from "sequelize-typescript";
import { User } from "./user";
import { Vacation } from "./vacation";
import { followVacation } from "../controllers/follows/controller";
import { followsVacationIdValidator } from "../controllers/follows/validator";
import paramsValidation from "../middlewares/params-validation";
import { regularUserValidator } from "../middlewares/role-validation";
import { followsRouter } from "../routers/follow";

@Table({
  underscored: true,
})
export class Follow extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @PrimaryKey
  @ForeignKey(() => Vacation)
  @Column(DataType.UUID)
  vacationId: string;
}

// למעקב אחרי חופשה
followsRouter.post(
  "/follow/:vacationId",
  regularUserValidator,
  paramsValidation(followsVacationIdValidator),
  followVacation
);
