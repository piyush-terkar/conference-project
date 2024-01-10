import { Injectable } from "@nestjs/common";
import { UserService } from "src/Users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { createUserDto } from "src/Users/dtos/createUser.dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
    //private jwtService: JwtService
  ) {}

  async register(userDto: createUserDto) {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser(userDto);
    return user;
  }
}
