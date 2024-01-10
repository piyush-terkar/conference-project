import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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
      entities: [User, Room],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
