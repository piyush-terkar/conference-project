import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cancelation } from "./cancelations.entity";
import { Repository } from "typeorm";
import { Booking } from "src/Bookings/booking.entity";

@Injectable()
export class CancelationService {
  constructor(
    @InjectRepository(Cancelation)
    private cancellationRepository: Repository<Cancelation>
  ) {}

  async addCancellation(booking: Booking, reason: string) {
    let cancellation = this.cancellationRepository.create();
    cancellation = { ...booking, reason: reason, cancelationId: null };
    await this.cancellationRepository.save(cancellation);
  }
}
