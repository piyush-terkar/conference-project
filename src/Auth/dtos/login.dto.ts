import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication and Users")
export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
