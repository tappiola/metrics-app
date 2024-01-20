import { Report } from '@prisma/client';

export interface ReportResponse {
  uuid: string;
  report: Omit<Report, 'uuid'>;
}
