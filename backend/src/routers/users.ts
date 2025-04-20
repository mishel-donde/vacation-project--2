import { Router } from "express";
import { getAllUsers } from "../controllers/users/controller";
import enforceAuth from "../middlewares/enforce-auth";
import { adminValidator } from "../middlewares/role-validation";

const usersRouter = Router();

usersRouter.use(enforceAuth);
usersRouter.get("/", adminValidator, getAllUsers);

export default usersRouter;
