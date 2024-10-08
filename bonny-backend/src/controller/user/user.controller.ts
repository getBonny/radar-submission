import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { Profile } from 'src/model/profile/profile.entity';
import { ProfileService } from 'src/model/profile/profile.service';
import { ReferralService } from 'src/model/referral/referral.service';
import { StatsService } from 'src/model/stats/stats.service';

@Controller('user')
export class UserController {
  constructor(
    private profileService: ProfileService,
    private statsSerivce: StatsService,
    private refService: ReferralService,
  ) {}

  @Post('signup')
  //@UseGuards(FirebaseAuthGuard)
  async signUp(@Body() profile: any) {
    await this.saveProfile(this.mapToProfile(profile));
    if (profile.referralCode) {
      await this.refService.addReferrer(profile.id, profile.referralCode);
    }
    // anything else?
    await this.statsSerivce.addUser();
    return { status: 'successful' };
  }

  async saveProfile(profile: Profile): Promise<Profile> {
    return await this.profileService.save(profile);
  }

  mapToProfile(json): Profile {
    const profile = new Profile();
    profile.id = json.id;
    profile.pda = '';
    profile.phoneNr = json.phoneNumber;
    profile.email = json.email;
    profile.tokens = json.tokens;
    profile.userName = String(json.userName).trim();
    profile.supporterStatus = 'Newbie';
    return profile;
  }

  // currently only the update of the username is supported
  @Put(':id')
  //@UseGuards(FirebaseAuthGuard)
  async updateUser(@Param('id') id: string, @Body() profile: any) {
    if (!id) {
      throw new HttpException('Missing id!', HttpStatus.NOT_FOUND);
    }
    const profileEntity = await this.profileService.get(id);
    if (profile.username) {
      profileEntity.userName = String(profile.userName).trim();
    }
    if (profile.email) {
      profileEntity.email = String(profile.email).trim();
    }
    return await this.saveProfile(profileEntity);
  }

  @Get('exists')
  async exists(@Query('userName') userName: string) {
    const profileEntity = await this.profileService.findByUserName(userName);
    if (profileEntity) {
      return {
        exists: true,
      };
    } else {
      return {
        exists: false,
      };
    }
  }
}
