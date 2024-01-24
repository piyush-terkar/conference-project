import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { BookingService } from "./bookings.service";
import { BookingController } from "./bookings.controller";
import { RoomsModule } from "src/Rooms/rooms.module";
import { VerifyAvailability } from "./verifyAvailability.middleware";
import { IsOwner } from "./isOwner.middleware";
import { CancelationModule } from "src/Cancelations/cancelations.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    RoomsModule,
    CancelationModule,
  ],
  exports: [BookingService],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyAvailability).forRoutes("book/new");
    // consumer
    //   .apply(IsOwner)
    //   .forRoutes({ path: "book/:id", method: RequestMethod.DELETE });
  }
}
