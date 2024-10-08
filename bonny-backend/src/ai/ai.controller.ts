import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import * as crypto from 'crypto';
import { ProfileService } from '../model/profile/profile.service';
@Controller('ai')
export class AiController {
  constructor(
    private ai: AiService,
    private profileService: ProfileService,
  ) {}

  @Get('chat')
  async chat(@Query('query') query: string) {
    const { sql } = await this.ai.generateSQL(query);
    const res = await this.ai.executeSQL(sql);
    console.trace(res);
    return res;
  }

  @Post('test')
  async test(
    @Body('uid') uid: string,
    @Body('imageData') imageData: string,
    @Body('contentType') contentType: string,
  ) {
    //TODO move logic into service, for testability and reusability
    try {
      const weeklyUploadCount =
        await this.profileService.increaseWeeklyUploadCount(uid);
      if (weeklyUploadCount >= 12) {
        return {
          valid: false,
          reason: 'Weekly upload limit reached',
          status: 'limit_exceeded',
          trust_score: 0,
          quality_score: 0,
        };
      }

      const isDuplicate = await this.isDuplicateUpload(imageData, contentType);

      // If the receipt is already in the database, return a duplicate error
      if (isDuplicate) {
        this.profileService.decreaseWeeklyUploadCount(uid);
        return {
          valid: false,
          reason: 'Duplicate receipt',
          status: 'duplicate',
          trust_score: 0,
          quality_score: 0,
        };
      }

      // Test the receipt
      const testRes = await this.ai.test(imageData, contentType);

      //if (testRes.products_tracked < 1) {
        //testRes.valid = false;
        //this.profileService.decreaseWeeklyUploadCount(uid);
      //}

      const transactionDateTime = Date.parse(testRes.transaction_timestamp);
      if (isOlderThanOneMonth(transactionDateTime)) {
        testRes.valid = false;
        testRes.reason = 'Receipt is older than one month.';
        testRes.status = undefined
        this.profileService.decreaseWeeklyUploadCount(uid);
      }

      if(testRes.image_type == 'banking') {
        testRes.valid = false;
        testRes.reason = 'Image is a banking transaction.'
        testRes.status = 'no_receipt'
        this.profileService.decreaseWeeklyUploadCount(uid)
      }

      console.debug(testRes);
      console.debug(`Receipt valid\nreason: ${testRes.reason}`);
      return testRes;

    } catch (e) {
      this.profileService.decreaseWeeklyUploadCount(uid);
      console.error(e);
      throw e;
    }
  }

  private async isDuplicateUpload(imageData: string, contentType: string) {
    // Decode base64 to binary
    const binaryData = Buffer.from(imageData, 'base64');

    // Create Blob
    const blob = new Blob([binaryData], { type: contentType });

    // Convert Blob back to buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create hash from the buffer
    const hash = crypto.createHash('md5').update(buffer).digest('base64');

    // console.debug(hash);

    // Check if the receipt is already in the database
    const isDuplicate = await this.ai.isDuplicate(hash);
    return isDuplicate;
  }
}

function isOlderThanOneMonth(transactionDateTime: number): boolean {
  const dateTime2WeeksAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return transactionDateTime < dateTime2WeeksAgo;
}
