import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingQueue } from "./bookingQueue.entity";
import { Repository } from "typeorm";
import { Cron } from "@nestjs/schedule";

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
    const bookingQ = {
      ...this.bookingQueueRepo.create(),
      startTime: start,
      endTime: end,
      roomId: roomId,
      userId: userId,
    };
    await this.bookingQueueRepo.save(bookingQ);
    return bookingQ;
  }

  async getAllByID(id: number): Promise<BookingQueue[] | undefined> {
    return await this.bookingQueueRepo.find({ where: { roomId: id } });
  }

  @Cron("*/5 * * * *")
  async removeExpiredEntries(): Promise<void> {
    Logger.log("Expired entries cleared from Booking Queue.", "BookingQueue");
    await this.bookingQueueRepo
      .createQueryBuilder()
      .delete()
      .where("endTime <= :currTime", { currTime: new Date() })
      .execute();
  }

  async removeFromQueue(entity: BookingQueue) {
    await this.bookingQueueRepo.remove(entity);
  }
}
