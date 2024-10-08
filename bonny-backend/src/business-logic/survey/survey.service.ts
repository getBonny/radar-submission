import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Answer } from 'src/db/schema';
import { Survey } from 'src/db/schema';
import { dbService } from 'src/db/database.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class SurveyService {
  constructor(
    private db: dbService,
    private userService: UserService,
  ) {}

  async getAll(): Promise<Survey[]> {
    return await this.db.client.query.survey.findMany({
      where: (survey, { eq }) => eq(survey.id, 1),
    });
  }

  async add(survey: Survey): Promise<Survey> {
    const [newSurvey] = await this.db.client.insert(this.db.schema.survey)
      .values(survey)
      .returning();
    return newSurvey;
  }

  async get(id: number): Promise<Survey> {
    return await this.db.client.query.survey.findFirst({
      where: eq(this.db.schema.survey.id, id),
    });
  }

  async update(id: number, survey: Partial<Survey>): Promise<Survey> {
    await this.db.client.update(this.db.schema.survey)
      .set(survey)
      .where(eq(this.db.schema.survey.id, id));
    return this.get(id);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const result = await this.db.client.delete(this.db.schema.survey)
      .where(eq(this.db.schema.survey.id, id));
    return { success: result.length > 0 };
  }

  async submitAnswer(uid: string, answer: Answer) {
    const user = await this.userService.get(uid);

    /*for (const a of answer) {
      const question = await this.db.client.query.question.findFirst({
        where: eq(this.db.schema.question.id, a.questionId),
      });

      if (question.type === 'text') {
          await this.db.client.insert(this.db.schema.answer).values({
          userId: user.id,
          questionId: question.id,
          freeText: a.freeText,
        });
      } else {
        const option = await this.db.client.query.questionOption.findFirst({
          where: eq(this.db.schema.questionOption.id, a.optionId),
        });
        await this.db.client.insert(this.db.schema.answer).values({
          userId: user.id,
          questionId: question.id,
          selectedOptionId: option.id,
        });
      }
    }*/
  }
}
