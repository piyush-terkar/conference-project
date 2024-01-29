import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./dtos/createUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(userDto: createUserDto): Promise<User> {
    const newUser = {
      ...this.userRepository.create(),
      username: userDto.username,
      password: userDto.password,
      role: userDto.role || "user",
    };
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
