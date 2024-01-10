import { Module } from "@nestjs/common";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./users.service";
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
