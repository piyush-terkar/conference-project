import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/Users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { createUserDto } from "src/Users/dtos/createUser.dto";
import { ProfileDto } from "./dtos/profile.dto";
import { AccessTokenDto } from "./dtos/accessToken.dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(userDto: createUserDto): Promise<ProfileDto> {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser(userDto);
    return { username: user.username, role: user.role, id: user.id };
  }

  async login(username: string, pass: string): Promise<AccessTokenDto> {
    const user = await this.userService.findOne(username);
    if (!user) throw new NotFoundException(`No User named: ${username}`);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException("Incorrect Password");
    }
    const payload = { username: user.username, id: user.id, role: user.role };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
