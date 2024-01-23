import { ApiProperty, ApiTags } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

@ApiTags("Rooms")
export class RoomDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updatedAt: Date;
}
