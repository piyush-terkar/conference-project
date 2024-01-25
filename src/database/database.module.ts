import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingQueue } from "src/BookingQueue/bookingQueue.entity";
import { Booking } from "src/Bookings/booking.entity";
import { Cancelation } from "src/Cancelations/cancelations.entity";
import { Room } from "src/Rooms/rooms.entity";
import { User } from "src/Users/users.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME || "root",
      password: process.env.DATABASE_PASSWORD || "password",
      database: process.env.DATABASE_NAME || "conferenceRooms",
      entities: [User, Room, Booking, Cancelation, BookingQueue],
      synchronize: process.env.NODE_ENV !== "production",
    }),
  ],
})
export class DatabaseModule {}
