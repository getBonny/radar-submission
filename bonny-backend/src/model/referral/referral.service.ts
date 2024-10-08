import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Referral } from './referral.entity';
import { TransactionService } from '../transaction/transaction.service';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { ReferralTopTierList } from 'src/controller/home/home.entity';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,
    private profileService: ProfileService,
    private transactionService: TransactionService,
  ) {}

  async addReferrer(profileId: string, referrerUsername: string) {
    const referrerProfile: Profile =
      await this.profileService.findByUserName(referrerUsername);
    const refereeProfile: Profile = await this.profileService.get(profileId);

    const referral: Referral = {
      refereeProfileId: refereeProfile.id,
      referrerProfileId: referrerProfile.id,
      referee: refereeProfile,
      referrer: referrerProfile,
    };
    //TODO: create DB transaction for both
    await this.referralRepository.insert(referral);
    await this.addReferralBonus(refereeProfile);
  }

  private async addReferralBonus(refereeProfile: Profile) {
    const bonusAmount: number = 100.0;
    await this.transactionService.addReferralBonusTrx(
      refereeProfile,
      bonusAmount,
    );
    refereeProfile.tokens += bonusAmount;
    await this.profileService.save(refereeProfile);
  }

  async getTopListReferredUsers(referrerProfileId: string) {
    const topReferrals = await this.referralRepository
      .createQueryBuilder('r')
      .select('p2.userName, COALESCE(SUM(t.tokens),0)', 'totalTokens')
      .innerJoin(Profile, 'p', 'r.referrerProfileId = p.id')
      .innerJoin(Profile, 'p2', 'r.refereeProfileId = p2.id')
      .leftJoin(
        Transaction,
        't',
        'r.refereeProfileId = t.profileId AND t.type = :type AND p2.id = t.profileId',
        { type: 'referral_comission' },
      )
      .where('r.referrerProfileId = :referrerId', {
        referrerId: referrerProfileId,
      })
      .groupBy('p2.userName')
      .orderBy('SUM(t.tokens)', 'DESC')
      .getRawMany();
    const referredUserAmount = topReferrals.length;

    let totalComission = 0;
    for (const referral of topReferrals) {
      totalComission += referral.totalTokens;
    }
    return {
      amountUser: referredUserAmount,
      referrals: topReferrals,
      totalComission: totalComission,
    } as ReferralTopTierList;
  }

  async getReferrer(refereeProfileId: string): Promise<Profile> {
    const rId = (
      await this.referralRepository.findOneBy({
        refereeProfileId: refereeProfileId,
      })
    ).referrerProfileId;

    return await this.profileService.get(rId);
  }

  async hasReferrer(refereeProfileId: string): Promise<boolean> {
    return await this.referralRepository.existsBy({
      refereeProfileId: refereeProfileId,
    });
  }
}
