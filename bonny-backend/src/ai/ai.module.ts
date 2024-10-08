import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ProfileModule } from 'src/model/profile/profile.module';


@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [ProfileModule],
})
export class AiModule {}
