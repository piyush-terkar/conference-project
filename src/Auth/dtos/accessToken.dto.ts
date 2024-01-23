import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

@ApiTags("Authentication and Users")
export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
