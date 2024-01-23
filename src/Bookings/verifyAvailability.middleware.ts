import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { BookingService } from "./bookings.service";
import { isNull } from "util";

@Injectable()
export class VerifyAvailability implements NestMiddleware {
  constructor(private bookingService: BookingService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { startTime, endTime, roomId } = req.body;
    const bookings = await this.bookingService.verifyAvailability(
      new Date(startTime),
      new Date(endTime),
      roomId
    );
    if (!isNull(bookings)) {
      throw new ConflictException(
        `Conference Room with ID: ${roomId} is already booked between ${startTime} and ${endTime}`
      );
    }
    next();
  }
}
