import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@ApiTags("Authentication and Users")
export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
