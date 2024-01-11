import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
  Request,
} from "@nestjs/common";
import { BookingService } from "./bookings.service";
import { BookingDto } from "./dtos/bookings.dto";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ParseDatePipe } from "src/Auth/pipes/parseDate.pipe";

@Controller("book")
@ApiBearerAuth()
@ApiTags("Bookings")
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiQuery({ name: "end", type: Date })
  @ApiQuery({ name: "start", type: Date })
  @ApiResponse({ status: 200, description: "All available rooms are fetched" })
  @Get()
  async getAvailableRooms(
    @Query("start", ParseDatePipe) start: Date,
    @Query("end", ParseDatePipe) end: Date
  ): Promise<any> {
    if (!start || !end) {
      throw new BadRequestException(
        "The Request must contain start and end as query parameters (example: /book?start=startTime&end=endTime"
      );
    }
    return await this.bookingService.findFreeRooms(start, end);
  }

  @Post("new")
  @ApiResponse({ status: 200, description: "The Conference room is reserved" })
  @ApiResponse({
    status: 409,
    description: "The room is already booked for given time slot",
  })
  async newReservation(@Body() bookingDto: BookingDto, @Request() request) {
    const start = new Date(bookingDto.startTime);
    const end = new Date(bookingDto.endTime);

    return await this.bookingService.newReservation(
      start,
      end,
      bookingDto.roomId,
      request.user.id
    );
  }
}
