import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum SignalAction {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum SignalStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CLOSED = 'CLOSED',
}

@Entity('signals')
@Index(['status', 'created_at'])
export class Signal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  provider_id!: string;

  @ManyToOne(() => User, (user) => user.signals)
  @JoinColumn({ name: 'provider_id' })
  provider!: User;

  @Column()
  asset_pair!: string;

  @Column({
    type: 'enum',
    enum: SignalAction,
  })
  action!: SignalAction;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  entry_price!: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  target_price!: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  stop_loss!: number;

  @Column({ type: 'text' })
  rationale!: string;

  @Column({ type: 'int', default: 50 })
  confidence_score!: number;

  @Column({
    type: 'enum',
    enum: SignalStatus,
    default: SignalStatus.ACTIVE,
  })
  status!: SignalStatus;

  @Column({ type: 'int', default: 0 })
  executed_count!: number;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  total_profit_loss!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  success_rate!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ type: 'timestamp' })
  expires_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
