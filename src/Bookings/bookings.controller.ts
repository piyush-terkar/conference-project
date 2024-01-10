import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { BookingService } from "./bookings.service";
import { query } from "express";

@Controller("book")
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  async getAvailableRooms(@Query() query): Promise<any> {
    if (!query || !query?.start || !query?.end) {
      throw new BadRequestException();
    }
    const start = new Date(query.start);
    const end = new Date(query.end);
    return await this.bookingService.findFreeRooms(start, end);
  }
}
