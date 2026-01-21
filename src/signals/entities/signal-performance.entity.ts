import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Signal } from './signal.entity';

@Entity('signal_performances')
export class SignalPerformance {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  signal_id!: string;

  @ManyToOne(() => Signal)
  @JoinColumn({ name: 'signal_id' })
  signal!: Signal;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  price_at_timestamp!: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  unrealized_pnl!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  current_roi!: number;

  @CreateDateColumn()
  timestamp!: Date;
}
