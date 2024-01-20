import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../../prisma/prisma';
import { Prisma } from '@prisma/client';
import { ReportResponse } from './report.types';

@Injectable()
export class ReportService {
  async create(newReport: Prisma.ReportCreateInput): Promise<ReportResponse> {
    const { data, ...reportFields } = newReport;

    const { uuid, ...report } = await prisma.report.create({
      data: {
        ...reportFields,
        created: new Date(),
        updated: new Date(),
        data: {
          // @ts-ignore
          create: data,
        },
      },
    });

    return {
      uuid,
      report,
    };
  }

  async getOne(id: string): Promise<ReportResponse> {
    const dbReport = await prisma.report.findUnique({
      select: {
        uuid: true,
        title: true,
        description: true,
        created: true,
        updated: true,
        userId: true,
        data: {
          select: {
            metricId: true,
            value: true,
          },
        },
      },
      where: {
        uuid: id,
      },
    });

    if (!dbReport) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'The specified resource was not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'No report in DB',
        },
      );
    }

    const { uuid, ...report } = dbReport;

    return {
      uuid,
      report,
    };
  }

  async getAll(userId: string): Promise<ReportResponse[]> {
    const dbReports = await prisma.report.findMany({
      select: {
        uuid: true,
        title: true,
        description: true,
        created: true,
        updated: true,
        userId: true,
        data: {
          select: {
            metricId: true,
            value: true,
          },
        },
      },
      where: {
        userId,
      },
      orderBy: {
        created: 'desc',
      },
    });

    return dbReports.map((dbReport) => {
      const { uuid, ...report } = dbReport;

      return {
        uuid,
        report,
      };
    });
  }
}
