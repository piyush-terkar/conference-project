import { Module } from "@nestjs/common";
import { CancelationService } from "./cancelations.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cancelation } from "./cancelations.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cancelation])],
  exports: [CancelationService],
  providers: [CancelationService],
})
export class CancelationModule {}
