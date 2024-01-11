import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Rooms")
export class RoomDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
