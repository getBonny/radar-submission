import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserService } from './current-user.service';
import { EntitySubscriber } from './entity-subscriber';
import { Auditable } from './auditable.entity';
import { UserInterceptor } from './user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Auditable])],
  providers: [
    CurrentUserService,
    EntitySubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
  exports: [CurrentUserService, EntitySubscriber],
})
export class AuditModule {}
