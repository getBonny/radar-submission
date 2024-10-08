import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/database.module';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';

@Module({
  providers: [LevelService],
  controllers: [LevelController],
  imports: [DbModule],
  exports: [LevelService],
})
export class LevelModule {}
