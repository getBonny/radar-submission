import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Survey } from 'src/db/schema';
import { SurveyService } from './survey.service';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get('all')
  async getAllSurveys(): Promise<Survey[]> {
    return this.surveyService.getAll();
  }

  @Get(':id')
  async getSurvey(@Param('id', ParseIntPipe) id: number): Promise<Survey> {
    return this.surveyService.get(id);
  }

  @Post()
  async addSurvey(@Body() survey: Survey): Promise<Survey> {
    return this.surveyService.add(survey);
  }

  @Put(':id')
  async updateSurvey(
    @Param('id', ParseIntPipe) id: number,
    @Body() survey: Partial<Survey>
  ): Promise<Survey> {
    return this.surveyService.update(id, survey);
  }

  @Delete(':id')
  async removeSurvey(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.surveyService.remove(id);
  }
}
