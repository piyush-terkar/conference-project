import { Injectable } from "@nestjs/common";
import { Room } from "./rooms.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>
  ) {}
}
