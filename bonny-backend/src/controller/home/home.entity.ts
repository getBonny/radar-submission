import { Profile } from 'src/model/profile/profile.entity';
import { SpecialOffer } from 'src/model/special_offer/specialOffer.entity';

export interface ReferralTopTierList {
  amountUser: number;
  referrals: {
    userName: string;
    gainedTokens: number;
  }[];
}
  
export interface PositionItem {
  position: number,
  totalUsers: number
}

export class Home {
  profile: Profile;
  specialOffers: SpecialOffer[];
  referralList: ReferralTopTierList;
  position: PositionItem

  constructor(
    profile: Profile,
    specialOffers: SpecialOffer[],
    referralList: ReferralTopTierList,
    position: PositionItem,
  ) {
    this.profile = profile;
    this.specialOffers = specialOffers;
    this.referralList = referralList;
    this.position = position
  }
}
