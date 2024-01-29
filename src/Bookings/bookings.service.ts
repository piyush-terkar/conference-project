import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { RoomsService } from "src/Rooms/rooms.service";
import { Room } from "src/Rooms/rooms.entity";
import { CancelationService } from "src/Cancelations/cancelations.service";
import { BookingQueueService } from "src/BookingQueue/bookingQueue.service";
import { BookingQueue } from "src/BookingQueue/bookingQueue.entity";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    private roomsService: RoomsService,
    private cancelationService: CancelationService,
    private bookingQueueService: BookingQueueService
  ) {}

  async verifyAvailability(
    start: Date,
    end: Date,
    roomId: number
  ): Promise<Booking> {
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

  async newReservation(
    start: Date,
    end: Date,
    roomId: number,
    userId: number
  ): Promise<Booking> {
    const newReservation = {
      ...this.bookingRepository.create(),
      startTime: start,
      endTime: end,
      roomId: roomId,
      userId: userId,
    };
    await this.bookingRepository.save(newReservation);
    return newReservation;
  }

  async reserveNextInQueue(queue: BookingQueue[]): Promise<void> {
    let prevBooking;
    for (let i = 0; i < queue.length; i++) {
      prevBooking = await this.verifyAvailability(
        queue[i].startTime,
        queue[i].endTime,
        queue[i].roomId
      );
      if (prevBooking == undefined) {
        await this.newReservation(
          queue[i].startTime,
          queue[i].endTime,
          queue[i].roomId,
          queue[i].userId
        );
        await this.bookingQueueService.removeFromQueue(queue[i]);
        break;
      }
    }
  }

  async findFreeRooms(start: Date, end: Date): Promise<Room[] | undefined> {
    return await this.roomsService.getAll(start, end);
  }

  async findAndDeletewithReason(id: number, reason: string): Promise<void> {
    const cancellation = await this.bookingRepository.findOne({
      where: {
        bookingId: id,
      },
    });
    if (cancellation == undefined)
      throw new NotFoundException(`No Reservation with Booking ID: ${id}`);
    const queue = await this.bookingQueueService.getAllByID(
      cancellation.roomId
    );
    await this.cancelationService.addCancellation(cancellation, reason);
    await this.bookingRepository.remove(cancellation);
    await this.reserveNextInQueue(queue);
  }

  async findById(id: number): Promise<Booking> {
    return await this.bookingRepository.findOne({ where: { bookingId: id } });
  }

  async insert(booking: Booking): Promise<void> {
    await this.bookingRepository.save(booking);
  }
}
