export interface ReceiptDataItemDTO {
  description: string;
  amount: number;
  total_price: number;
}

export interface ReceiptDataDTO {
  receipt_date: Date;
  total_amount: number;
  supplier_name: string;
  supplier_location: string;
  language: string;
  country: string;
  trust_score: number;
  quality_score: number;
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
