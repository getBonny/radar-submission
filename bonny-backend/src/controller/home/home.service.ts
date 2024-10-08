import { Injectable } from '@nestjs/common';
import { Home } from './home.entity';
import { ProfileService } from 'src/model/profile/profile.service';
import { SpecialOfferService } from 'src/model/special_offer/specialOffer.service';
import { ReferralService } from 'src/model/referral/referral.service';

@Injectable()
export class HomeService {
  constructor(
    private profileService: ProfileService,
    private specialOfferService: SpecialOfferService,
    private referralService: ReferralService,
  ) {}

  async loadHome(uid: string) {
    return new Home(
      await this.profileService.get(uid),
      await this.specialOfferService.getAll(),
      await this.referralService.getTopListReferredUsers(uid),
      await this.profileService.findUserPosition(uid),
    );
  }
}
