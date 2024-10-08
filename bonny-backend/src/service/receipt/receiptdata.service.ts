import { Injectable, OnModuleInit } from '@nestjs/common';
import { Message, PubSub } from '@google-cloud/pubsub';
import { Transaction } from 'src/model/transaction/transaction.entity';
import {
  ReceiptAttributesDTO,
  ReceiptDataDTO,
  ReceiptDTO,
} from './model/receiptData';
import { ProfileService } from 'src/model/profile/profile.service';
import { Receipt } from 'src/model/receipt/receipt.entity';
import { CouponService } from 'src/model/coupons/coupons.service';
import { Coupon } from 'src/model/coupons/coupons.entity';
import { StatsService } from 'src/model/stats/stats.service';
import { Profile } from 'src/model/profile/profile.entity';
import { FirebaseProvider } from 'src/firebase/firebase.provider';
import { TransactionService } from 'src/model/transaction/transaction.service';
import { ConfigService } from '@nestjs/config';
import { ReferralService } from 'src/model/referral/referral.service';
import { ReceiptService } from 'src/model/receipt/receipt.service';

@Injectable()
export class ReceiptDataService implements OnModuleInit {
  constructor(
    private profileService: ProfileService,
    private firebaseProvider: FirebaseProvider,
    private couponService: CouponService,
    private stats: StatsService,
    private transactionService: TransactionService,
    private configService: ConfigService,
    private referralService: ReferralService,
    private receiptService: ReceiptService,
  ) {}

  onModuleInit() {
    const pubsub = new PubSub({
      projectId: this.configService.getOrThrow<string>('GOOGLE_PROJECT_ID'),
    });
    const subscription = pubsub.subscription(
      this.configService.getOrThrow<string>('GOOGLE_SUBSCRIPTION_TOPIC'),
      {
        flowControl: {
          maxMessages: 100,
        },
        batching: {
          maxMessages: 20,
        },
      },
    );
    subscription.on('message', (message) => this.readReceipts(message));
  }

  private async readReceipts(message: Message) {
    const receipt: ReceiptDTO = JSON.parse(
      message.data.toString(),
    ) as ReceiptDTO;
    const data: ReceiptDataDTO = receipt.data;
    const attributes: ReceiptAttributesDTO = receipt.attributes;

    const weeklyUploadCount = await this.profileService.getWeeklyUploadCount(
      attributes.userId,
    );
    if (weeklyUploadCount >= 12) {
      message.ack();
      return;
    }

    if (!receipt.valid) {
      this.sendMobileNotification(
        attributes,
        'Image Processing Failed',
        'Please try again.',
      );
      message.ack();
      this.profileService.decreaseWeeklyUploadCount(attributes.userId);
      return;
    }

    try {
      const date = data.receipt_date;
      const supplier = data.supplier_name;
      if (!supplier) {
        throw new Error('Could not extract supplier from image.');
      }
      const totalAmount = data.total_amount;

      const parsed = {
        receiptDate: this.getValidDateOrToday(date),
        supplierName: supplier,
        totalAmount: totalAmount,
      };

      let tokenAmount;
      const cid = Number(attributes.couponKey);
      if (Number.isNaN(cid) || cid == 0) {
        tokenAmount = await this.calculateTokenAmount(parsed.totalAmount);
      } else {
        const coupon = await this.couponService.get(cid);
        tokenAmount = await this.calculateTokenAmount(
          parsed.totalAmount,
          coupon,
        );
        await this.couponService.redeemCoupon(attributes.userId, coupon);
      }
      const profileEntity = await this.profileService.get(attributes.userId);

      const receiptTrx: Transaction = {
        id: 0,
        type: cid ? 'coupon' : 'receipt_upload',
        status: 'confirmed',
        tokens: tokenAmount,
        blockchainTxId: '',
        receipt: null,
        questStatus: null,
        profile: profileEntity,
        timestamp: new Date(),
        createdBy: '',
        updatedBy: '',
        createdOn: undefined,
        updatedOn: undefined,
      };

      const receiptTrxEntity = await this.transactionService.add(receiptTrx);

      const receipt: Receipt = {
        id: 0,
        storageUrl: attributes.filePath,
        supplierName: parsed.supplierName,
        totalAmount: parsed.totalAmount,
        receiptDate: parsed.receiptDate,
        hash: attributes.md5hash,
        transactions: receiptTrxEntity,
        createdBy: '',
        updatedBy: '',
        createdOn: undefined,
        updatedOn: undefined,
      };

      await this.receiptService.add(receipt);

      await this.increaseTokenAmount(profileEntity, tokenAmount);

      await this.stats.addReceipt(tokenAmount);

      await this.addReferralComission(profileEntity, receiptTrxEntity);

      // see also https://firebase.google.com/docs/cloud-messaging/send-message
      // and https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.messaging?hl=de
      this.sendMobileNotification(
        attributes,
        'Receipt Processing Successful',
        'You gained ' + tokenAmount + ' token!',
      );

      message.ack();
    } catch (e) {
      this.sendMobileNotification(
        attributes,
        'Receipt Processing Failed',
        'Please try again.',
      );
      console.error(e);
      message.ack();
      this.profileService.decreaseWeeklyUploadCount(attributes.userId);
    }
  }

  private async increaseTokenAmount(profileEntity: Profile, tokenAmount: any) {
    const updateProfileDTO = new Profile();
    updateProfileDTO.tokens = profileEntity.tokens + tokenAmount;
    await this.profileService.update(profileEntity.id, updateProfileDTO);
  }

  async addReferralComission(
    refereeProfile: Profile,
    transaction: Transaction,
  ) {
    const hasReferrer = await this.referralService.hasReferrer(
      refereeProfile.id,
    );

    if (hasReferrer) {
      const comission: number = this.calculateReferralComission(transaction);
      await this.transactionService.addReferralComissionTrx(
        refereeProfile,
        comission,
      );
      await this.updateReferrerTokenAmount(refereeProfile.id, comission);
    }
  }

  private async updateReferrerTokenAmount(
    refereeProfileId: string,
    comission: number,
  ) {
    const referrerProfile: Profile =
      await this.referralService.getReferrer(refereeProfileId);
      const updateProfileDTO = new Profile();
      updateProfileDTO.tokens = referrerProfile.tokens + comission;
      this.profileService.update(referrerProfile.id, updateProfileDTO);
  }

  private calculateReferralComission(transaction: Transaction): number {
    return (transaction.tokens * 5) / 100;
  }

  private sendMobileNotification(
    attributes: ReceiptAttributesDTO,
    title: string,
    body: string,
  ) {
    if (attributes.fcmToken) {
      this.firebaseProvider
        .getFirebase()
        .messaging()
        .send({
          token: attributes.fcmToken,
          data: {
            hash: attributes.md5hash || '',
          },
          notification: {
            title: title,
            body: body,
          },
        })
        .then((response) => {
          // Response is a message ID string.
          console.trace('Successfully sent message:', response);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  }

  async calculateTokenAmount(netAmount: number, coupon?: Coupon) {
    // TODO
    // let tokens = Math.floor(netAmount * 100) * 0.0005;
    let tokens = 40.0;
    if (coupon) tokens *= coupon.multiplier;
    return tokens;
  }

  private getValidDateOrToday(extractedDate: any | undefined): Date {
    const date = new Date(extractedDate);
    if (this.isValidDate(date)) {
      return date;
    } else {
      return new Date();
    }
  }

  private isValidDate(d) {
    // @ts-ignore
    return d instanceof Date && !isNaN(d);
  }
}
