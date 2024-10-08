import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SurveyService } from './survey.service';
import { DbModule } from 'src/db/database.module';
import { SurveyController } from './survey.controller';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
  imports: [
    UserModule,
    DbModule
  ],
  exports: [SurveyService]
})
export class SurveyModule {}
