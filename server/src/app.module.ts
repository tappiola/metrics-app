import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReportModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
