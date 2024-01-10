import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/Rooms/rooms.entity";
import { User } from "src/Users/users.entity";

export class BookingDto {
  @ApiProperty()
  bookingId: number;

  @ApiProperty()
  roomId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  user: User;

  @ApiProperty()
  room: Room;
}
