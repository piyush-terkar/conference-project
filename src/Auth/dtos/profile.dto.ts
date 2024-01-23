import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

@ApiTags("Authentication and Users")
export class ProfileDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ enum: ["admin", "user"] })
  @IsString()
  @IsIn(["admin", "user"])
  role: string;
}
