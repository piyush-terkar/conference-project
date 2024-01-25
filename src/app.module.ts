import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./Users/users.module";
import { AuthModule } from "./Auth/auth.module";
import { RoomsModule } from "./Rooms/rooms.module";
import { BookingModule } from "./Bookings/bookings.module";
import { BookingQueueModule } from "./BookingQueue/bookingQueue.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    BookingModule,
    BookingQueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
