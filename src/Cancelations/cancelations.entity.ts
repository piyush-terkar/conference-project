import { Room } from "src/Rooms/rooms.entity";
import { User } from "src/Users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Cancelation {
  @PrimaryGeneratedColumn()
  cancelationId: number;

  @Column()
  reason: string;

  @Column()
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
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: "roomId" })
  room: Room;
}
