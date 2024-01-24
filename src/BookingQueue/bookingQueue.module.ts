import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingQueue } from "./bookingQueue.entity";
import { BookingService } from "src/Bookings/bookings.service";
import { BookingQueueController } from "./bookingQueue.controller";

@Module({
  imports: [TypeOrmModule.forFeature([BookingQueue])],
  exports: [BookingService],
  providers: [BookingService],
  controllers: [BookingQueueController],
})
export class BookingQueueModule {}
