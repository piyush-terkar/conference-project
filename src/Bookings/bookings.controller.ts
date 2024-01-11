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

@Controller("book")
@ApiBearerAuth()
@ApiTags("Bookings")
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiQuery({ name: "end", type: Date })
  @ApiQuery({ name: "start", type: Date })
  @ApiResponse({ status: 200, description: "All available rooms are fetched" })
  @Get()
  async getAvailableRooms(@Query() query): Promise<any> {
    if (!query || !query?.start || !query?.end) {
      throw new BadRequestException();
    }
    const start = new Date(query.start);
    const end = new Date(query.end);
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
    if (this.bookingService.verifyAvailability(start, end, bookingDto.roomId)) {
      throw new ConflictException();
    }

    return await this.bookingService.newReservation(
      start,
      end,
      bookingDto.roomId,
      request.user.id
    );
  }
}
