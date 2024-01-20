import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';

@Module({
  imports: [],
  controllers: [ReportController, MetricController],
  providers: [ReportService, MetricService],
})
export class ReportModule {}
