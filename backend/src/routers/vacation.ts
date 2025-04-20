import { Router } from "express";
import {
  createVacation,
  exportFollowersCSV,
  getAllVacations,
  getVacation,
  removeVacation,
  updateVacation,
} from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import {
  newVacationFilesValidator,
  newVacationValidator,
  updateVacationFilesValidator,
  UpdateVacationValidator,
  vacationIdValidator,
} from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import enforceAuth from "../middlewares/enforce-auth";
import fileUploader from "../middlewares/file-uploader";
import { adminValidator } from "../middlewares/role-validation";
import filesValidation from "../middlewares/file-validation";

const vacationsRouter = Router();

vacationsRouter.use(enforceAuth);

vacationsRouter.get("/reports/followers", adminValidator, exportFollowersCSV);

vacationsRouter.get("/", getAllVacations);

vacationsRouter.get(
  "/:vacationId",
  adminValidator,
  paramsValidation(vacationIdValidator),
  getVacation
);

vacationsRouter.post(
  "/",
  adminValidator,
  validation(newVacationValidator),
  filesValidation(newVacationFilesValidator),
  fileUploader,
  createVacation
);

vacationsRouter.delete(
  "/:vacationId",
  adminValidator,
  paramsValidation(vacationIdValidator),
  removeVacation
);

vacationsRouter.patch(
  "/:vacationId",
  adminValidator,
  paramsValidation(vacationIdValidator),
  validation(UpdateVacationValidator),
  filesValidation(updateVacationFilesValidator),
  fileUploader,
  updateVacation
);

export default vacationsRouter;
