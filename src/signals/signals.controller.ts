import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SignalsService } from './signals.service';
import { CreateSignalDto } from './dto/signals.dto';
import { SignalStatus } from './entities/signal.entity';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Post()
  create(@Body() createSignalDto: CreateSignalDto) {
    return this.signalsService.create(createSignalDto);
  }

  @Get()
  findAll(@Query('status') status?: SignalStatus) {
    return this.signalsService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.signalsService.findOne(id);
  }

  @Patch(':id/performance')
  updatePerformance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() metrics: { total_profit_loss: number; success_rate: number; executed_count: number },
  ) {
    return this.signalsService.updatePerformance(id, metrics);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.signalsService.remove(id);
  }
}
