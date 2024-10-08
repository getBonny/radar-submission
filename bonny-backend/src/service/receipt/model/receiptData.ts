import { ReceiptItem } from "src/db/schema";

export interface ReceiptDataItemDTO {
  description: string;
  amount: number;
  totalPrice: number;
}

export interface ReceiptDataDTO {
  receiptDate: Date;
  totalAmount: number;
  supplierName: string;
  supplierLocation: string;
  paymentMethod: string;
  language: string;
  country: string;
  currency: string;
  items: ReceiptItem[];
  trustScore: number;
  qualityScore: number;
}

export interface ReceiptAttributesDTO {
  bucket: string;
  filePath: string;
  userId: string;
  contentType: string;
  md5hash: string;
  fcmToken: string;
  couponKey: string;
}

export interface ReceiptDTO {
  valid: boolean;
  data: ReceiptDataDTO;
  attributes: ReceiptAttributesDTO;
}

export interface ReceiptUploadMessage {
  event: string,
  payload: ReceiptDTO,
  type: string
}