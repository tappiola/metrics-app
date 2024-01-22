import prisma from './prisma';
import {
  METRICS,
  NORMAL_USER_1,
  NORMAL_USER_2,
  USER_WITHOUT_REPORTS,
} from './seed-data';

const seedDatabase = async () => {
  // Populate default metrics
  for (const metric of METRICS) {
    await prisma.metric.upsert({
      where: {
        id: metric.id,
      },
      update: {},
      create: {
        id: metric.id,
        description: metric.description,
        type: metric.type,
      },
    });
  }

  // Create user without reports
  await prisma.user.upsert({
    where: {
      uuid: USER_WITHOUT_REPORTS.uuid,
    },
    update: {},
    create: {
      uuid: USER_WITHOUT_REPORTS.uuid,
      email: USER_WITHOUT_REPORTS.email,
      passwordHash: USER_WITHOUT_REPORTS.passwordHash,
    },
  });

  // Create users with reports
  for (const user of [NORMAL_USER_1, NORMAL_USER_2]) {
    await prisma.user.upsert({
      where: {
        uuid: user.uuid,
      },
      update: {},
      create: {
        uuid: user.uuid,
        email: user.email,
        passwordHash: user.passwordHash,
        report: {
          create: [2021, 2022].map((year) => ({
            title: `ACME Environmental Report ${year}`,
            description: `Environmental report ${year} of user ${user.email}`,
            created: new Date(year, 1, 21),
            updated: new Date(year, 1, 21),
            data: {
              create: [
                {
                  metricId: 'e1.1.1',
                  value: '100',
                },
                {
                  metricId: 'e1.2.1',
                  value: '200',
                },
                {
                  metricId: 'e1.3.1',
                  value: '300',
                },
                {
                  metricId: 'e1.4.1',
                  value: 'true',
                },
                {
                  metricId: 'e1.5.1',
                  value: 'Industry',
                },
              ],
            },
          })),
        },
      },
    });
  }
};

seedDatabase()
  .then(async () => {
    console.log('Database seeded successfully!');
  })
  .catch(async (error) => {
    console.error('Error seeding database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
