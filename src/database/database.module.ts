import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/Bookings/booking.entity";
import { Cancelation } from "src/Cancelations/cancelations.entity";
import { Room } from "src/Rooms/rooms.entity";
import { User } from "src/Users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "conferenceRooms",
      entities: [User, Room, Booking, Cancelation],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
