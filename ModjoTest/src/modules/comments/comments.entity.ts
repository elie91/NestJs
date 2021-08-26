import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Call } from '../calls/calls.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Call, (call) => call.comments)
  @JoinColumn()
  call: Call;

  @Column()
  callId: Call['id'];

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'datetime' })
  timestamp: Date;
}
