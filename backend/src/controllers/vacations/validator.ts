import Joi from "joi";

export const newVacationValidator = Joi.object({
  destination: Joi.string().min(3).max(50).required(),
  vacationDestination: Joi.string().min(10).required(),
  startingDate: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0)) // ודא שהתאריך לא נמצא בעבר
    .required()
    .messages({
      "date.min": "Cannot select dates in the past",
    }),

  endingDate: Joi.date().min(Joi.ref("startingDate")).required().messages({
    "date.min": "End date must be after start date",
  }),
  price: Joi.number().min(0).max(10000).required(),
});

// עדכון וולידציה לחופשה מעודכנת
export const UpdateVacationValidator = Joi.object({
  destination: Joi.string().min(3).max(50).required(),
  vacationDestination: Joi.string().min(10).required(),
  startingDate: Joi.date().required(),
  endingDate: Joi.date().min(Joi.ref("startingDate")).required().messages({
    "date.min": "End date must be after start date",
  }),
  price: Joi.number().min(0).max(10000).required(),
});

export const newVacationFilesValidator = Joi.object({
  vacationImage: Joi.object({
    mimetype: Joi.string().valid(
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp"
    ),
  })
    .unknown(true)
    .required(),
});

export const updateVacationFilesValidator = Joi.object({
  vacationImage: Joi.object({
    mimetype: Joi.string().valid(
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp"
    ),
  })
    .unknown(true)
    .optional(),
});

export const vacationIdValidator = Joi.object({
  vacationId: Joi.string().uuid().required(),
});
