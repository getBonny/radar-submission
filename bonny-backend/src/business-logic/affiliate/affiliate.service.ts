import { Injectable } from '@nestjs/common';
import { Affiliate } from '../../db/schema';
import { dbService } from 'src/db/database.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class AffiliateService {
  constructor(private db: dbService) {}

  async getAll(language: string = 'en'): Promise<Affiliate[]> {
    return await this.db.client.query.affiliate.findMany({
      where: (affiliate, { eq }) => eq(affiliate.language, language)
    });
  }

  async add(affiliate: Affiliate): Promise<Affiliate> {
    const [newAffiliate] = await this.db.client.insert(this.db.schema.affiliate).values(affiliate).returning();
    return newAffiliate;
  }

  async get(id: number): Promise<Affiliate | undefined> {
    const [affiliate] = await this.db.client.query.affiliate.findMany({
      where: (affiliate, { eq }) => eq(affiliate.id, id),
      limit: 1
    });
    return affiliate;
  }

  async update(id: number, profile: Partial<Affiliate>): Promise<Affiliate | undefined> {
    const [updatedAffiliate] = await this.db.client
      .update(this.db.schema.affiliate)
      .set(profile)
      .where(eq(this.db.schema.affiliate.id, id))
      .returning();
    return updatedAffiliate;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.db.client
      .delete(this.db.schema.affiliate)
      .where(eq(this.db.schema.affiliate.id, id))
      .execute();
    return result.length > 0;
  }
}
