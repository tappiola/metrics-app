import { Injectable } from '@nestjs/common';
import prisma from '../../prisma/prisma';
import { Metric } from '@prisma/client';

@Injectable()
export class MetricService {
  async getAll(): Promise<Metric[]> {
    return prisma.metric.findMany();
  }
}
