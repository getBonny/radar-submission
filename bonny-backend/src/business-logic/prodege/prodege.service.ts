import { Injectable } from '@nestjs/common';
import { TransactionService } from 'src/business-logic/transaction/transaction.service';
import { ProdegeReward } from './prodege.controller';
import { Transaction } from 'src/db/schema';
import { UserService } from '../user/user.service';
import { TRANSACTION_TYPE } from 'src/db/schema/transaction';

@Injectable()
export class ProdegeService {
  constructor(
    private txService: TransactionService,
    private userService: UserService,
  ) {}

  async saveProdegeReward(reward: ProdegeReward) {
    const user = await this.userService.get(reward.uid);

    user.tokens += reward.tokens;

    await this.userService.save(user);

    const tx: Transaction = {
      id: 0,
      type: TRANSACTION_TYPE.PRODEGE,
      tokens: reward.tokens,
      userId: user.id,
      createdBy: '',
      updatedBy: '',
      createdOn: new Date(),
      updatedOn: new Date(),
      typeInfo: {}
    };

    await this.txService.add(tx);
  }
}
