import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingQueue } from "./bookingQueue.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookingQueueService {
  constructor(
    @InjectRepository(BookingQueue)
    private bookingQueueRepo: Repository<BookingQueue>
  ) {}

  async insertInQueue(
    start: Date,
    end: Date,
    roomId: number,
    userId: number
  ): Promise<BookingQueue> {
    const bookingQ = this.bookingQueueRepo.create();
    bookingQ.startTime = start;
    bookingQ.endTime = end;
    bookingQ.roomId = roomId;
    bookingQ.userId = userId;
    await this.bookingQueueRepo.save(bookingQ);
    return bookingQ;
  }
}
