import { Injectable } from "@nestjs/common";
import { Room } from "./rooms.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoomDto } from "./dtos/createRoom.dto";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>
  ) {}

  newRoom = async (roomDto: RoomDto) => {
    const newRoom = this.roomRepository.create();
    newRoom.name = roomDto.name;
    await this.roomRepository.save(newRoom);
    return newRoom;
  };

  getAll = async () => {
    return await this.roomRepository.find();
  };
}
