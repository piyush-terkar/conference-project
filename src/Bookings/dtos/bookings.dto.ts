import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Bookings")
export class BookingDto {
  @ApiProperty()
  roomId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
