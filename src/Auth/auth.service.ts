import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/Users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { createUserDto } from "src/Users/dtos/createUser.dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(userDto: createUserDto) {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser(userDto);
    return { username: user.username, role: user.role, id: user.id };
  }

  async login(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, id: user.id, role: user.role };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
