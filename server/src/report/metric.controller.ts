import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { MetricService } from './metric.service';
import { Metric } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('metrics')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Get()
  async listMetrics(): Promise<Metric[]> {
    return this.metricService.getAll();
  }
}
