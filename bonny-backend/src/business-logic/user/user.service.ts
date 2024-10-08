import { Injectable } from '@nestjs/common';
import { dbService } from 'src/db/database.service';
import { User } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private db: dbService) {}

  async getAll(): Promise<User[]> {
    return await this.db.client.select().from(this.db.schema.user);
  }

  async save(user: User): Promise<User> {
    const [savedUser] = await this.db.client.insert(this.db.schema.user)
      .values(user)
      .returning();
    return savedUser;
  }

  async getCover(id: string): Promise<User> {
    return await this.db.client.query.user.findFirst({
      where: eq(this.db.schema.user.id, id)
    })
  }

  async get(id: string): Promise<User> {
    return await this.db.client.query.user.findFirst({
      where: eq(this.db.schema.user.id, id),
    });
  }

  async findUserPosition(uid: string) {
    const sortedUsers = await this.db.client.query.user.findMany({
      orderBy: (users, { desc }) => [desc(users.tokens)],
    });
    const position = sortedUsers.findIndex(user => user.id === uid) + 1;

    return { position: position, totalUsers: sortedUsers.length };
  }

  async findByUserByEmail(email: string): Promise<User> {
    return await this.db.client.query.user.findFirst({
      where: eq(this.db.schema.user.email, email),
    });
  }


  async findByUserName(userName: string): Promise<User> {
    return await this.db.client.query.user.findFirst({
      where: eq(this.db.schema.user.userName, userName),
    });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.db.client.update(this.db.schema.user)
      .set(user)
      .where(eq(this.db.schema.user.id, id));
    return await this.db.client.query.user.findFirst({
      where: eq(this.db.schema.user.id, id),
    });
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const result = await this.db.client.delete(this.db.schema.user)
      .where(eq(this.db.schema.user.id, id));
    return { success: result.length > 0 };
  }
}
