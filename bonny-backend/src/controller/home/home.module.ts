import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { SpecialOfferModule } from 'src/model/special_offer/specialOffer.module';
import { ProfileModule } from 'src/model/profile/profile.module';
import { ReferralModule } from 'src/model/referral/referral.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [SpecialOfferModule, ProfileModule, ReferralModule],
})
export class HomeModule {}
