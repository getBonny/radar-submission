import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from 'src/db/schema';

@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get('enabled')
  async getAllEnabledQuestsForUser(
    @Query('uid') uid: string,
    @Query('language') language: string = 'en',
  ): Promise<Quest[]> {
    return this.questService.getAllEnabledQuestsForUser(uid, language);
  }

  @Post('complete/:qid')
  async completeQuest(
    @Query('uid') uid: string,
    @Param('qid') qid: number,
  ): Promise<any> {
    return this.questService.completeQuest(uid, qid);
  }

  @Post()
  async createQuest(@Body() quest: Quest): Promise<Quest> {
    return this.questService.add(quest);
  }

  @Get(':id')
  async getQuest(@Param('id') id: number): Promise<Quest> {
    return this.questService.get(id);
  }

  @Put(':id')
  async updateQuest(
    @Param('id') id: number,
    @Body() quest: Partial<Quest>,
  ): Promise<Quest> {
    return this.questService.update(id, quest);
  }

  @Delete(':id')
  async deleteQuest(@Param('id') id: number): Promise<void> {
    await this.questService.remove(id);
  }
}
