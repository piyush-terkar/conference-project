import { ApiProperty, ApiTags } from "@nestjs/swagger";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

@ApiTags("Bookings")
export class BookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  roomId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  userId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endTime: Date;
}
