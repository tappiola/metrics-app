import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '../auth/auth.guard';
import { ReportDto, ReportResponse } from './report.types';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async listReports(@Req() request: Request): Promise<ReportResponse[]> {
    const user = request['user'];
    return this.reportService.getAll(user.sub);
  }

  @Get(':id')
  async getReport(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<ReportResponse> {
    const user = request['user'];

    const reportResponse = await this.reportService.getOne(id);

    if (user.sub !== reportResponse.report.userId) {
      throw new ForbiddenException();
    }

    return reportResponse;
  }

  @Post()
  create(
    @Req() request: Request,
    @Body() report: ReportDto,
  ): Promise<ReportResponse> {
    const user = request['user'];

    return this.reportService.create(report, user.sub);
  }
}
