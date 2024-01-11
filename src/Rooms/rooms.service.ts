import { Injectable } from "@nestjs/common";
import { Room } from "./rooms.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, In, Not, Repository } from "typeorm";
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

  getAll = async (start: Date, end: Date) => {
    const bookedRooms = await this.roomRepository.find({
      select: { id: true },
      relations: { bookings: true },
      where: [
        { bookings: { startTime: Between(start, end) } },
        { bookings: { endTime: Between(start, end) } },
      ],
    });
    const bookedIds = bookedRooms.map((booking) => booking.id);
    console.log(bookedIds);

    return await this.roomRepository.find({
      where: { id: Not(In(bookedIds)) },
    });
  };
}
