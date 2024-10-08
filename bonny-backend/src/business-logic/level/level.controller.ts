import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Level, User } from 'src/db/schema';
import { LevelService } from './level.service';
import { LevelType } from 'src/db/schema/levels';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  async getUser(@Param('id') id: string): Promise<LevelType[]> {
    return this.levelService.getAll();
  }
}
