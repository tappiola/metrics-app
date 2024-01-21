import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ReportService } from './report.service';
import { INestApplication } from '@nestjs/common';
import { ReportModule } from './report.module';

const AUTH_HEADER =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMDk3MTNmMy01YTJhLTQ4NGQtOWQzYi1hM2M3NGRiNzAwNDgiLCJpYXQiOjE3MDU4NDg2NjksImV4cCI6MTczNzQwNjI2OX0.CAEbPGEFH-bk3gHY9CoueqNUP5u4tx4B2e50kNG2mrc';

describe('Report', () => {
  let app: INestApplication;
  const reportService = {
    getAll: () => [
      {
        uuid: 'bla',
        report: {
          title: 'report title',
        },
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ReportModule],
    })
      .overrideProvider(ReportService)
      .useValue(reportService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /reports', () => {
    it(`should return list of reports`, async () => {
      const response = await request(app.getHttpServer())
        .get('/reports')
        .set('Authorization', AUTH_HEADER);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(reportService.getAll());
    });

    it(`should return 401 when called without auth`, async () => {
      const response = await request(app.getHttpServer()).get('/reports');
      expect(response.status).toEqual(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
