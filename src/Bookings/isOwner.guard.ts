import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { BookingService } from "./bookings.service";

@Injectable()
export class IsOwner implements CanActivate {
  constructor(private bookingService: BookingService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;
    const booking = await this.bookingService.findById(id);
    if (booking.userId === user.id) {
      return true;
    } else {
      throw new UnauthorizedException(
        "Only the user who made a reservation can cancel it, you don't have the required Permissions"
      );
    }
  }
}
