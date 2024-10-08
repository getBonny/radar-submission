import {
  BadRequestException,
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
      hash: hash,
      uid: uid,
      tokens: Number(tokens),
      usdValue: Number(usdValue),
      tx: tx,
      offerName: offerName,
      taskName: taskName,
      surveyCategory: surveyCategory,
    };
    console.debug(reward);
    const fullUrl = this.extractFullUrl(request);
    this.verifyRequest(fullUrl, process.env.PRODEGE_SECRET_KEY);

    this.pService.saveProdegeReward(reward);
  }

  private extractFullUrl(request: Request) {
    const fullUrl = 'https://' + request.get('host') + request.originalUrl;
    console.debug('Called with: ' + fullUrl);
    return fullUrl;
  }

  private verifyRequest(url, secretKey) {
    const splitUrl = url.split('&hash=');
    const hmac = createHmac('sha1', secretKey);
    hmac.write(splitUrl[0]);
    hmac.end();
    if (splitUrl[1] !== hmac.read().toString('hex')) {
      throw new ForbiddenException('Invalid Request Parameters');
    }
  }
}

export interface ProdegeReward {
  hash: string;
  uid: string;
  tokens: number;
  usdValue: number;
  tx: string;
  offerName: string;
  taskName: string;
  surveyCategory: string;
}
