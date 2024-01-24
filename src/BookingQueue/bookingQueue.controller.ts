import { Controller, Post, Request } from "@nestjs/common";
import { BookingQueueService } from "./bookingQueue.service";

@Controller("queue")
export class BookingQueueController {
  constructor(private bookingQueueService: BookingQueueService) {}

  @Post("new")
  async insert(@Request() request): Promise<string> {
    const { startTime, endTime, roomId } = request.body;
    const queue = await this.bookingQueueService.insertInQueue(
      startTime,
      endTime,
      roomId,
      request.user.id
    );
    return `Conference Room with ID: ${roomId} is already booked between ${startTime} and ${endTime} \nYou will be alotted booking if the current booking is cancelled, your Queue ID is: ${queue.bookingQueueId} `;
  }
}
