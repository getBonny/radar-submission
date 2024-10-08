import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ReceiptAttributesDTO,
  ReceiptDataDTO,
  ReceiptDTO,
  ReceiptUploadMessage,
} from './model/receiptData';
import { UserService } from 'src/business-logic/user/user.service';
import { StatsService } from 'src/business-logic/stats/stats.service';
import { TransactionService } from 'src/business-logic/transaction/transaction.service';
import { Receipt, Transaction } from 'src/db/schema';
import { User } from 'src/db/schema';
import { Coupon } from 'src/db/schema';
import { SupabaseService } from '../supabase/supabase.service';
import { TRANSACTION_TYPE, TxReceiptTypeInfo } from 'src/db/schema/transaction';
import { ReceiptService } from 'src/business-logic/receipt/receipt.service';
import { LitService } from '../lit/lit.service';
import { EncryptionMetadata } from 'src/db/schema/lit';

@Injectable()
export class ReceiptDataService implements OnModuleInit {
  constructor(
    private userService: UserService,
    private stats: StatsService,
    private transactionService: TransactionService,
    private supabase: SupabaseService,
    private receiptService: ReceiptService,
    private litService: LitService
  ) {}

  onModuleInit() {
    this.subscribeToStorageEvents()
  }

  private subscribeToStorageEvents() {
    const channel = this.supabase.getClient().channel('llm-receipt-extract');
    console.log("listening to channel")

    channel
    .on(
      'broadcast',
      { event: 'new_receipt' },
      (message: ReceiptUploadMessage) => {
        message.payload.valid ?
        this.handleValidReceipt(message.payload) :
        this.handleInvalidReceipt(message.payload)
      }
    )
    .subscribe()

  }

  private async handleValidReceipt(receipt: ReceiptDTO) {
    const data: ReceiptDataDTO = receipt.data;
    const attributes: ReceiptAttributesDTO = receipt.attributes;

    try {
      const supplier = data.supplierName;
      if (!supplier) {
        throw new Error('Could not extract supplier from image.');
      }

      const user = await this.userService.getCover(attributes.userId);

      const tokenAmount = await this.calculateTokenAmount(receipt.data.totalAmount)

      const transaction = await this.insertTransaction(tokenAmount, user)

      const newReceipt = await this.insertReceipt(receipt, transaction)

      const encryptionMetadata = await this.litService.encryptReceipt(newReceipt)

      await this.receiptService.update(newReceipt.id, {encryptionMetadata: encryptionMetadata})

      transaction.typeInfo = {
        receipt_id: newReceipt.id
      }

      transaction.typeInfo as TxReceiptTypeInfo

      //update typeInfo
      await this.transactionService.update(transaction.id, transaction)


      //update user tokens
      user.tokens += tokenAmount;
      await this.userService.update(user.id, user)

      //update network stats
      await this.stats.addReceipt(tokenAmount)


      this.sendUserNotification(user, transaction, encryptionMetadata)


    } catch (e) {
        console.log(e)
    };

  }

  async insertTransaction(tokens: number, user: User) {
    return await this.transactionService.add({
      type: TRANSACTION_TYPE.RECEIPT_UPLOAD,
      tokens: tokens,
      userId: user.id,
      typeInfo: {},
      createdBy: '',
      updatedBy: '',
      createdOn: new Date(),
      updatedOn: new Date()
    });
  }

  async insertReceipt(receipt: ReceiptDTO, transaction: Transaction): Promise<Receipt> {
    return await this.receiptService.addWithItems({
      storageUrl: receipt.attributes.filePath,
      supplierName: receipt.data.supplierName,
      supplierLocation: receipt.data.supplierLocation,
      country: receipt.data.country,
      currency: receipt.data.currency,
      language: receipt.data.language,
      totalAmount: receipt.data.totalAmount,
      paymentMethod: receipt.data.paymentMethod,
      receiptDate: this.getValidDateOrToday(receipt.data.receiptDate),
      hash: receipt.attributes.md5hash,
      items: receipt.data.items,
      transactionId: transaction.id,
      qualityScore: receipt.data.qualityScore,
      trustScore: receipt.data.trustScore,
      encryptionMetadata: '',
      createdBy: '',
      updatedBy: '',
      createdOn: new Date(),
      updatedOn: new Date()
    })
  }

  private sendUserNotification(user: User, transaction: Transaction, metadata: EncryptionMetadata) {
    this.supabase.getClient().channel(user.id).send({
      type: "broadcast",
      event: "receipt_extract",
      payload: {
        transaction: transaction,
        metadata: metadata
      }
    })
  }

  private handleInvalidReceipt(receipt: ReceiptDTO) {
    console.log("Invalid")
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
