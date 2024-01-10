import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Request,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDto } from "src/Users/dtos/createUser.dto";
import { Public } from "./decorators/public.decorator";
import { LoginDto } from "./dtos/login.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication and Users")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  register(@Body() userDto: createUserDto) {
    return this.authService.register(userDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @ApiBearerAuth("Bearer JWT")
  @HttpCode(HttpStatus.OK)
  @Get("profile")
  profile(@Request() req) {
    return req.user;
  }
}
