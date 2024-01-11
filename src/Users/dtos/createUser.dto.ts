import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

@ApiTags("Authentication and Users")
export class createUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty({ enum: ["admin", "user"] })
  @IsString()
  @IsIn(["admin", "user"])
  role: string;
}
