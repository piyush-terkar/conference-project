import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingQueue } from "./bookingQueue.entity";
import { BookingService } from "src/Bookings/bookings.service";
import { BookingQueueController } from "./bookingQueue.controller";
import { BookingModule } from "src/Bookings/bookings.module";
import { BookingQueueService } from "./bookingQueue.service";

@Module({
  imports: [TypeOrmModule.forFeature([BookingQueue])],
  exports: [BookingQueueService],
  providers: [BookingQueueService],
  controllers: [BookingQueueController],
})
export class BookingQueueModule {}
