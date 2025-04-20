import { Request, Response, NextFunction } from "express";
import { Follow } from "../../models/follow";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
import { Vacation } from "../../models/vacation";

// Follow Vacation
export async function followVacation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    const userId = user.userId;
    const { vacationId } = req.params;

    // בדוק אם החופשה קיימת
    const vacation = await Vacation.findByPk(vacationId);
    if (!vacation) {
      return next(new AppError(StatusCodes.NOT_FOUND, "Vacation not found"));
    }

    // בדוק אם המשתמש כבר עוקב אחרי החופשה
    const existingFollow = await Follow.findOne({
      where: { userId, vacationId },
    });
    if (existingFollow) {
      return next(
        new AppError(StatusCodes.CONFLICT, "Already following this vacation")
      );
    }

    // צור עוקב חדש
    const newFollowVacation = await Follow.create({ userId, vacationId });
    res.json(newFollowVacation);

    // Emit Socket Message
    socket.emit(SocketMessages.FOLLOW_VACATION, {
      from: req.headers["x-client-id"],
      data: { vacationId, user },
    });
  } catch (err) {
    next(err);
  }
}

// Unfollow Vacation
export async function unfollowVacation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    const userId = user.userId;
    const { vacationId } = req.params;

    // בדוק אם החופשה קיימת
    const vacation = await Vacation.findByPk(vacationId);
    if (!vacation) {
      return next(new AppError(StatusCodes.NOT_FOUND, "Vacation not found"));
    }

    // הסר עוקב אם הוא קיים
    const unfollowVacation = await Follow.destroy({
      where: { userId, vacationId },
    });

    if (!unfollowVacation) {
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          "User is not following this vacation"
        )
      );
    }

    res.json({ success: true });

    // Emit Socket Message
    socket.emit(SocketMessages.UNFOLLOW_VACATION, {
      from: req.headers["x-client-id"],
      data: { vacationId, user },
    });
  } catch (err) {
    next(err);
  }
}
