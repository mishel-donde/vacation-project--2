"use strict";
// import Joi from "joi";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacationIdValidator = exports.updateVacationFilesValidator = exports.newVacationFilesValidator = exports.UpdateVacationValidator = exports.newVacationValidator = void 0;
// export const newVacationValidator = Joi.object({
//   destination: Joi.string().min(3).max(50).required(),
//   description: Joi.string().min(10).required(),
//   startDate: Joi.date()
//     .min(new Date().setHours(0, 0, 0, 0))
//     .required()
//     .messages({
//       "date.min": "Cannot select dates in the past",
//     }),
//   endDate: Joi.date().min(Joi.ref("startDate")).required().messages({
//     "date.min": "End date must be after start date",
//   }),
//   price: Joi.number().min(0).max(10000).required(),
// });
// export const UpdateVacationValidator = Joi.object({
//   destination: Joi.string().min(3).max(50).required(),
//   description: Joi.string().min(10).required(),
//   startDate: Joi.date().required(),
//   endDate: Joi.date().min(Joi.ref("startDate")).required().messages({
//     "date.min": "End date must be after start date",
//   }),
//   price: Joi.number().min(0).max(10000).required(),
// });
// export const newVacationFilesValidator = Joi.object({
//   vacationImage: Joi.object({
//     mimetype: Joi.string().valid(
//       "image/png",
//       "image/jpg",
//       "image/jpeg",
//       "image/webp"
//     ),
//   })
//     .unknown(true)
//     .required(),
// });
// export const updateVacationFilesValidator = Joi.object({
//   vacationImage: Joi.object({
//     mimetype: Joi.string().valid(
//       "image/png",
//       "image/jpg",
//       "image/jpeg",
//       "image/webp"
//     ),
//   })
//     .unknown(true)
//     .optional(),
// });
// export const vacationIdValidator = Joi.object({
//   id: Joi.string().uuid().required(),
// });
const joi_1 = __importDefault(require("joi"));
exports.newVacationValidator = joi_1.default.object({
    destination: joi_1.default.string().min(3).max(50).required(),
    vacationDestination: joi_1.default.string().min(10).required(),
    startingDate: joi_1.default.date()
        .min(new Date().setHours(0, 0, 0, 0)) // ודא שהתאריך לא נמצא בעבר
        .required()
        .messages({
        "date.min": "Cannot select dates in the past",
    }),
    endingDate: joi_1.default.date().min(joi_1.default.ref("startingDate")).required().messages({
        "date.min": "End date must be after start date",
    }),
    price: joi_1.default.number().min(0).max(10000).required(),
});
// עדכון וולידציה לחופשה מעודכנת
exports.UpdateVacationValidator = joi_1.default.object({
    destination: joi_1.default.string().min(3).max(50).required(),
    vacationDestination: joi_1.default.string().min(10).required(),
    startingDate: joi_1.default.date().required(),
    endingDate: joi_1.default.date().min(joi_1.default.ref("startingDate")).required().messages({
        "date.min": "End date must be after start date",
    }),
    price: joi_1.default.number().min(0).max(10000).required(),
});
exports.newVacationFilesValidator = joi_1.default.object({
    vacationImage: joi_1.default.object({
        mimetype: joi_1.default.string().valid("image/png", "image/jpg", "image/jpeg", "image/webp"),
    })
        .unknown(true)
        .required(),
});
exports.updateVacationFilesValidator = joi_1.default.object({
    vacationImage: joi_1.default.object({
        mimetype: joi_1.default.string().valid("image/png", "image/jpg", "image/jpeg", "image/webp"),
    })
        .unknown(true)
        .optional(),
});
exports.vacationIdValidator = joi_1.default.object({
    vacationId: joi_1.default.string().uuid().required(),
});
