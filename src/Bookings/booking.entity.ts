import { Room } from "src/Rooms/rooms.entity";
import { User } from "src/Users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column()
  roomId: number;

  @Column()
  userId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Room, (room) => room.reservations)
  room: Room;
}
