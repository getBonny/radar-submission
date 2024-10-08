import {
  ProdegeController,
  ProdegeReward,
} from 'src/controller/prodege/prodege.controller';

import { ProdegeService } from 'src/controller/prodege/prodege.service';
import { TransactionService } from 'src/model/transaction/transaction.service';
import { ProfileService } from 'src/model/profile/profile.service';
import { Profile } from 'src/model/profile/profile.entity';

describe('Prodege', () => {
  let prodegeController: ProdegeController;
  let prodegeService: ProdegeService;
  let transactionService: TransactionService;
  let profileService: ProfileService;

  beforeEach(async () => {
    transactionService = {} as TransactionService;
    profileService = {} as ProfileService;

    transactionService.add = jest.fn();
    profileService.get = jest
      .fn()
      .mockResolvedValue({ tokens: 2000 } as Profile);
    profileService.save = jest.fn();

    prodegeService = new ProdegeService(transactionService, profileService);
    prodegeController = new ProdegeController(prodegeService);
  });

  describe('Prodege Service', () => {
    it('should add 2 tokens to a profile with already 2000 tokens', async () => {
      const rewardData = {
        hash: '12345',
        offerName: 'someOfferName',
        surveyCategory: 'Games',
        taskName: 'test',
        tokens: 2,
        tx: '123456',
        uid: 'user_1',
        usdValue: 0.2,
      } as ProdegeReward;

      await prodegeService.saveProdegeReward(rewardData);

      expect(await profileService.get).toHaveBeenCalledWith('user_1');
      expect(await profileService.save).toHaveBeenCalledWith({
        tokens: 2002.0,
      } as Profile);

      expect(await transactionService.add).toHaveBeenCalledWith({
        id: 0,
        type: 'prodege',
        status: 'confirmed',
        tokens: 2.0,
        timestamp: expect.any(Date),
        blockchainTxId: '',
        receipt: null,
        questStatus: null,
        profile: {
          tokens: 2002.0,
        } as Profile,
        createdBy: '',
        updatedBy: '',
        createdOn: undefined,
        updatedOn: undefined,
      });
    });
  });
});
