import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoomDto } from "./dtos/createRoom.dto";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { Role } from "src/Auth/roles.enum";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Roles(Role.Admin)
  @Post("new")
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: RoomDto })
  @ApiBearerAuth("bearer:token")
  createRoom(@Body() roomDto: RoomDto): Promise<RoomDto> {
    return this.roomsService.newRoom(roomDto);
  }
}
