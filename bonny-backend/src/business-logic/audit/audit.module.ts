import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserService } from './current-user.service';
import { UserInterceptor } from './user.interceptor';
import { DbModule } from 'src/db/database.module';

@Module({
  providers: [
    CurrentUserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
  imports: [DbModule],
  exports: [CurrentUserService],
})
export class AuditModule {}
