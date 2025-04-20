import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
import { Vacation } from "../../models/vacation";
import { User } from "../../models/user";

// Get all vacations (with followers)
export async function getAllVacations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const vacations = await Vacation.findAll({
      include: [
        {
          model: User,
          as: "followers",
        },
      ],
      order: [["startingDate", "ASC"]],
    });
    res.json(vacations);
  } catch (e) {
    next(e);
  }
}

// Get one vacation
export async function getVacation(
  req: Request<{ vacationId: string }, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const vacationId = req.params.vacationId;
    const vacation = await Vacation.findByPk(vacationId, {
      include: [
        {
          model: User,
          as: "followers",
        },
      ],
    });

    if (!vacation)
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          "The vacation you were trying to fetch does not exist"
        )
      );

    res.json(vacation);
  } catch (e) {
    next(e);
  }
}

// Create new vacation
export async function createVacation(
  req: Request<
    {},
    {},
    {
      destination: string;
      vacationDestination: string;
      startingDate: Date;
      endingDate: Date;
      price: number;
      imageUrl?: string;
    }
  >,
  res: Response,
  next: NextFunction
) {
  try {
    let createParams = { ...req.body };

    if (req.imageUrl) {
      const { imageUrl } = req;
      createParams = { ...createParams, imageUrl };
    }

    const newVacation = await Vacation.create(createParams);
    res.json(newVacation);

    socket.emit(SocketMessages.ADD_VACATION, {
      from: req.headers["x-client-id"],
      data: newVacation,
    });
  } catch (e) {
    next(e);
  }
}

// Update vacation
export async function updateVacation(
  req: Request<
    { vacationId: string },
    {},
    {
      destination: string;
      vacationDestination: string;
      startingDate: Date;
      endingDate: Date;
      price: number;
      imageUrl?: string;
    }
  >,
  res: Response,
  next: NextFunction
) {
  try {
    let createParams = { ...req.body };

    if (req.imageUrl) {
      const { imageUrl } = req;
      createParams = { ...createParams, imageUrl };
    }

    const updatedVacation = await Vacation.findByPk(req.params.vacationId);

    if (!updatedVacation)
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          "The vacation you were trying to update does not exist"
        )
      );

    const {
      price,
      endingDate,
      startingDate,
      vacationDestination,
      destination,
      imageUrl,
    } = createParams;

    updatedVacation.price = price;
    updatedVacation.endingDate = endingDate;
    updatedVacation.startingDate = startingDate;
    updatedVacation.vacationDestination = vacationDestination;
    updatedVacation.destination = destination;
    if (imageUrl) {
      updatedVacation.imageUrl = imageUrl;
    }

    await updatedVacation.save();
    await updatedVacation.reload({
      include: [
        {
          model: User,
          as: "followers",
        },
      ],
    });

    res.json(updatedVacation);

    socket.emit(SocketMessages.UPDATE_VACATION, {
      from: req.headers["x-client-id"],
      data: updatedVacation,
    });
  } catch (e) {
    next(e);
  }
}

// Remove vacation
export async function removeVacation(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { vacationId } = req.params;

    const deletedRows = await Vacation.destroy({
      where: { vacationId: vacationId },
    });

    if (deletedRows === 0)
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          "The vacation you were trying to delete does not exist"
        )
      );

    res.json({
      success: true,
    });

    socket.emit(SocketMessages.REMOVE_VACATION, {
      from: req.headers["x-client-id"],
      data: { vacationId: vacationId },
    });
  } catch (e) {
    next(e);
  }
}

// Export CSV for followers
export async function exportFollowersCSV(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const vacations = await Vacation.findAll({
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["userId"],
        },
      ],
      order: [["destination", "ASC"]],
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=vacation_followers.csv"
    );

    res.write("Destination,Followers\n");

    vacations.forEach((vacation) => {
      const safeDestination = vacation.destination.includes(",")
        ? `"${vacation.destination}"`
        : vacation.destination;

      res.write(`${safeDestination},${vacation.followers.length}\n`);
    });

    res.end();
  } catch (e) {
    next(e);
  }
}
