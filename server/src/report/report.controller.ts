import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ReportResponse } from './report.types';

// @UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get(':id')
  getReport(@Param('id') id: string): Promise<ReportResponse> {
    return this.reportService.getOne(id);
  }

  @Post()
  create(@Body() report: Report): Promise<ReportResponse> {
    return this.reportService.create(report);
  }
}
