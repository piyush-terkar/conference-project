import { Module } from "@nestjs/common";
import { UsersModule } from "src/Users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { RolesGuard } from "./guards/roles.guard";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "86400s" },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
