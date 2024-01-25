import { Room } from "src/Rooms/rooms.entity";
import { User } from "src/Users/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BookingQueue {
  @PrimaryGeneratedColumn()
  bookingQueueId: number;

  @CreateDateColumn()
  createdAt: Date;

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
