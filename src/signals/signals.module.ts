import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { Signal } from './entities/signal.entity';
import { SignalPerformance } from './entities/signal-performance.entity';
import { SignalInteraction } from './entities/signal-interaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Signal, SignalPerformance, SignalInteraction]),
  ],
  controllers: [SignalsController],
  providers: [SignalsService],
  exports: [SignalsService],
})
export class SignalsModule {}
