import { Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDto } from "src/Users/dtos/createUser.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  register(@Body() userDto: createUserDto) {
    return this.authService.register(userDto);
  }
}
