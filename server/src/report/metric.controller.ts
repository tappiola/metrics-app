import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { MetricService } from './metric.service';
import { Metric } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('metrics')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Get()
  async listMetrics(@Req() request: Request): Promise<Metric[]> {
    const user = request['user'];

    if (!user.sub) {
      throw new UnauthorizedException();
    }

    return this.metricService.getAll();
  }
}
