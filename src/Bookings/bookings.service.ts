import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { RoomsService } from "src/Rooms/rooms.service";
import { Room } from "src/Rooms/rooms.entity";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    private roomsService: RoomsService
  ) {}

  async findFreeRooms(start: Date, end: Date): Promise<Room[] | undefined> {
    const allBookings = await this.bookingRepository.find({
      relations: ["room"],
    });
    console.log(allBookings);
    if (allBookings.length === 0) {
      return await this.roomsService.getAll();
    }
    // return this.bookingRepository
    //   .createQueryBuilder("booking")
    //   .leftJoinAndSelect("booking.room", "room")
    //   .where(
    //     "(booking.startTime >= :start AND booking.startTime < :end) OR" +
    //       "(booking.endTime > :start AND booking.endTime <= :end) OR" +
    //       "(booking.startTime <= :start AND booking.endTime >= :end)",
    //     { start, end }
    //   )
    //   .getMany();
  }
}
