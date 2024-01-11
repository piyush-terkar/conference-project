import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication and Users")
export class createUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ enum: ["admin", "user"] })
  role: string;
}
