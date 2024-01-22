import { Report } from '@prisma/client';

export interface ReportDto {
  title: string;
  description: string;
  data: {
    metricId: string;
    value: string;
  };
}

export interface ReportResponse {
  uuid: string;
  report: Omit<Report, 'uuid'>;
}
