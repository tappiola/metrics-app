import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ReportResponse } from './report.types';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async listReports(@Req() request: Request): Promise<ReportResponse[]> {
    const user = request['user'];

    if (!user.sub) {
      throw new UnauthorizedException();
    }

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
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'The client does not have access rights to the content',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return reportResponse;
  }

  @Post()
  create(
    @Req() request: Request,
    @Body() report: Report,
  ): Promise<ReportResponse> {
    const user = request['user'];

    return this.reportService.create({
      ...report,
      user: {
        connect: {
          uuid: user.sub,
        },
      },
    });
  }
}
