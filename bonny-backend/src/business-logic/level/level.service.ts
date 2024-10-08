import { Injectable } from '@nestjs/common';
import { dbService } from 'src/db/database.service';
import { benefit, Level } from 'src/db/schema';

@Injectable()
export class LevelService {
  constructor(private db: dbService) {}

  async getAll(): Promise<Level[]> {
    const levels = await this.db.client.query.level.findMany({
      with: {
        levelToBenefits: {
          with: {
            benefit: true
          },
          
        }
      },
    });

    return levels.map(({levelToBenefits, ...level}) => ({
      ...level,
      benefits: levelToBenefits.map((ltb) => ltb.benefit),
    }));
  }

}
