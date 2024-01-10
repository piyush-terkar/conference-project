import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { BookingService } from "./bookings.service";
import { BookingController } from "./bookings.controller";
import { RoomsModule } from "src/Rooms/rooms.module";

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RoomsModule],
  exports: [BookingService],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
