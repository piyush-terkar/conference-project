import { Controller } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
}
