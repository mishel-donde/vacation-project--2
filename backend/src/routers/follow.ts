import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import { unfollowVacation } from "../controllers/follows/controller";
import paramsValidation from "../middlewares/params-validation";
import { regularUserValidator } from "../middlewares/role-validation";
import { followsVacationIdValidator } from "../controllers/follows/validator";

export const followsRouter = Router();

followsRouter.use(enforceAuth);

followsRouter.delete(
  "/unfollow/:vacationId",
  regularUserValidator,
  paramsValidation(followsVacationIdValidator),
  unfollowVacation
);

export default followsRouter;
