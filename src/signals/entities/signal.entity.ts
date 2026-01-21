import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { SignalPerformance } from './signal-performance.entity';

export enum SignalStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export enum SignalType {
  BUY = 'buy',
  SELL = 'sell',
}

export enum SignalOutcome {
  PENDING = 'pending',
  TARGET_HIT = 'target_hit',
  STOP_LOSS_HIT = 'stop_loss_hit',
  EXPIRED = 'expired',
  MANUALLY_CLOSED = 'manually_closed',
}

@Entity('signals')
export class Signal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'provider_id', type: 'uuid' })
  @Index()
  providerId!: string;

  @Column({ name: 'base_asset', length: 100 })
  @Index()
  baseAsset!: string;

  @Column({ name: 'counter_asset', length: 100 })
  @Index()
  counterAsset!: string;

  @Column({
    type: 'enum',
    enum: SignalType,
  })
  type!: SignalType;

  @Column({
    type: 'enum',
    enum: SignalStatus,
    default: SignalStatus.ACTIVE,
  })
  @Index()
  status!: SignalStatus;

  @Column({
    type: 'enum',
    enum: SignalOutcome,
    default: SignalOutcome.PENDING,
  })
  outcome!: SignalOutcome;

  @Column({ name: 'entry_price', type: 'decimal', precision: 18, scale: 8 })
  entryPrice!: string;

  @Column({ name: 'target_price', type: 'decimal', precision: 18, scale: 8 })
  targetPrice!: string;

  @Column({ name: 'stop_loss_price', type: 'decimal', precision: 18, scale: 8 })
  stopLossPrice!: string;

  @Column({ name: 'current_price', type: 'decimal', precision: 18, scale: 8, nullable: true })
  currentPrice?: string;

  @Column({ name: 'close_price', type: 'decimal', precision: 18, scale: 8, nullable: true })
  closePrice?: string;

  @Column({ name: 'copiers_count', default: 0 })
  copiersCount!: number;

  @Column({ name: 'total_copied_volume', type: 'decimal', precision: 18, scale: 8, default: '0' })
  totalCopiedVolume!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;

  @Column({ name: 'expires_at', type: 'timestamp' })
  @Index()
  expiresAt!: Date;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt?: Date;

  @OneToMany(() => SignalPerformance, (performance) => performance.signal)
  performanceHistory!: SignalPerformance[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
