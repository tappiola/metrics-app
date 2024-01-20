import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ReportModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
