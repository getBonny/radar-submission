import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { ProdegeService } from './prodege.service';
import { createHmac } from 'crypto';
import { Request } from 'express';

@Controller('prodege')
export class ProdegeController {
  constructor(private pService: ProdegeService) {}

  @Get('reward')
  rewardCallback(
    @Query('hash') hash: string,
    @Query('uid') uid: string,
    @Query('tokens') tokens: number,
    @Query('usd_value') usdValue: number,
    @Query('tx') tx: string,
    @Query('offer_name') offerName: string,
    @Query('task_name') taskName: string,
    @Query('survey_category') surveyCategory: string,
    @Req() request: Request,
  ) {
    const reward: ProdegeReward = {
      hash,
      uid,
      tokens: Number(tokens),
      usdValue: Number(usdValue),
      tx,
      offerName,
      taskName,
      surveyCategory,
    };
    console.debug(reward);
    const fullUrl = this.extractFullUrl(request);
    this.verifyRequest(fullUrl, process.env.PRODEGE_SECRET_KEY);

    this.pService.saveProdegeReward(reward);
  }

  private extractFullUrl(request: Request): string {
    const fullUrl = 'https://' + request.get('host') + request.originalUrl;
    console.debug('Called with: ' + fullUrl);
    return fullUrl;
  }

  private verifyRequest(url: string, secretKey: string): void {
    const splitUrl = url.split('&hash=');
    const hmac = createHmac('sha1', secretKey);
    hmac.update(splitUrl[0]);
    if (splitUrl[1] !== hmac.digest('hex')) {
      throw new ForbiddenException('Invalid Request Parameters');
    }
  }
}

export class ProdegeReward {
  hash: string;

  uid: string;

  tokens: number;

  usdValue: number;

  tx: string;

  offerName: string;

  taskName: string;

  surveyCategory: string;
}
