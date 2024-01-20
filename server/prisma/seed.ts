import prisma from './prisma';
import metricsData from './metric-data.json';
import { MetricType } from '@prisma/client';

const seedDatabase = async () => {
  try {
    await prisma.metric.createMany({
      data: metricsData as {
        id: string;
        type: MetricType;
        description: string;
      }[],
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
