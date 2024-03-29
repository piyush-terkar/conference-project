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

  async verifyAvailability(start: Date, end: Date, roomId: number) {
    const booking = await this.bookingRepository
      .createQueryBuilder()
      .where("roomId = :room", { room: roomId })
      .andWhere(
        "(startTime BETWEEN :start AND :end OR endTime BETWEEN :start AND :end)",
        { start, end }
      )
      .getOne();
    return booking;
  }

  async newReservation(start: Date, end: Date, roomId: number, userId: number) {
    const newReservation = this.bookingRepository.create();
    newReservation.startTime = start;
    newReservation.endTime = end;
    newReservation.roomId = roomId;
    newReservation.userId = userId;
    await this.bookingRepository.save(newReservation);
    return newReservation;
  }

  async findFreeRooms(start: Date, end: Date): Promise<Room[] | undefined> {
    return await this.roomsService.getAll(start, end);
  }
}
