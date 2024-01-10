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
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication and Users")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 200, type: createUserDto })
  @Post("register")
  register(@Body() userDto: createUserDto) {
    return this.authService.register(userDto);
  }

  @Public()
  @ApiResponse({ status: 200, description: "Bearer Token is sent" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @ApiBearerAuth("Bearer JWT")
  @ApiResponse({ status: 200, type: createUserDto })
  @HttpCode(HttpStatus.OK)
  @Get("profile")
  profile(@Request() req) {
    return req.user;
  }
}
