import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Signal } from '../../signals/entities/signal.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  wallet_address!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ default: 0 })
  reputation_score!: number;

  @OneToMany(() => Signal, (signal) => signal.provider)
  signals!: Signal[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
