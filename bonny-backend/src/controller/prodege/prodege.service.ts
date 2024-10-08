import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/model/transaction/transaction.entity';
import { TransactionService } from 'src/model/transaction/transaction.service';
import { ProdegeReward } from './prodege.controller';
import { ProfileService } from 'src/model/profile/profile.service';

@Injectable()
export class ProdegeService {
  constructor(
    private txService: TransactionService,
    private profileService: ProfileService,
  ) {}

  async saveProdegeReward(reward: ProdegeReward) {
    const profile = await this.profileService.get(reward.uid);

    profile.tokens += reward.tokens;

    await this.profileService.save(profile);

    const tx: Transaction = {
      id: 0,
      type: 'prodege',
      status: 'confirmed',
      tokens: reward.tokens,
      timestamp: new Date(),
      blockchainTxId: '',
      receipt: null,
      questStatus: null,
      profile: profile,
      createdBy: '',
      updatedBy: '',
      createdOn: undefined,
      updatedOn: undefined,
    };

    await this.txService.add(tx);
  }
}
