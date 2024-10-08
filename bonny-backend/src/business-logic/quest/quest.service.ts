import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { StatsService } from '../stats/stats.service';
import { dbService } from 'src/db/database.service';
import { and, eq, sql } from 'drizzle-orm';
import { Quest } from 'src/db/schema';
import { UserService } from '../user/user.service';
import { TRANSACTION_TYPE } from 'src/db/schema/transaction';
@Injectable()
export class QuestService {
  constructor(
    private db: dbService,
    private userService: UserService,
    private transactionService: TransactionService,
    private stats: StatsService,
  ) {}

  async getAllEnabledQuestsForUser(
    uid: string,
    language: string = 'en',
  ): Promise<Quest[]> {
    return await this.db.client.query.quest.findMany({
      where: (quest, { eq, and, notExists }) => and(
        eq(quest.enabled, true),
        eq(quest.language, language),
        notExists(
          this.db.client.select()
            .from(this.db.schema.questStatus)
            .where(and(
              eq(this.db.schema.questStatus.questId, quest.id),
              eq(this.db.schema.questStatus.userId, uid)
            ))
        )
      ),
      with: {
        reclaim: true,
        survey: {
          with: {
            questions: {
              with: {
                options: true
              }
            }
          }
        }
      }
    });
  }

  async completeQuest(uid: string, qid: number): Promise<any> {
    const user = await this.userService.get(uid);
    const quest = await this.get(qid);

    await this.userService.update(uid, {
      tokens: user.tokens + quest.points,
    });

    const [status] = await this.db.client.insert(this.db.schema.questStatus)
      .values({
        userId: user.id,
        status: 'done',
        completedDate: new Date()
      })
      .returning();

    await this.transactionService.add({
      type: TRANSACTION_TYPE.QUEST,
      typeInfo: {},
      tokens: quest.points,
      userId: user.id,
      createdBy: '',
      updatedBy: '',
      createdOn: new Date(),
      updatedOn: new Date()
    });

    await this.stats.addQuest(quest);

    return { gainedPoints: quest.points };
  }

  async add(quest: Quest): Promise<Quest> {
    const [newQuest] = await this.db.client.insert(this.db.schema.quest)
      .values(quest)
      .returning();
    return newQuest;
  }

  async get(id: number): Promise<Quest | undefined> {
    const [quest] = await this.db.client.query.quest.findMany({
      where: (quest, { eq }) => eq(quest.id, id),
      limit: 1
    });
    return quest;
  }

  async update(id: number, quest: Partial<Quest>): Promise<Quest | undefined> {
    const [updatedQuest] = await this.db.client
      .update(this.db.schema.quest)
      .set(quest)
      .where(eq(this.db.schema.quest.id, id))
      .returning();
    return updatedQuest;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.db.client
      .delete(this.db.schema.quest)
      .where(eq(this.db.schema.quest.id, id))
      .execute();
    return result.length > 0;
  }
}
