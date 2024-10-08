import { TRANSACTION_TYPE } from "../../src/types/schema/transaction";

export const TRANSACTION_TITLES: Record<TRANSACTION_TYPE, string> = {
    [TRANSACTION_TYPE.REFERRAL_BONUS]: 'Referral Bonus',
    [TRANSACTION_TYPE.REFERRAL_COMISSION]: 'Referral Commission',
    [TRANSACTION_TYPE.QUEST]: 'Quest',
    [TRANSACTION_TYPE.COUPON]: 'Coupon',
    [TRANSACTION_TYPE.RECEIPT_UPLOAD]: 'Receipt',
    [TRANSACTION_TYPE.PRODEGE]: 'Prodege'
  };
  
  export function mapTransactionType(type: string): TRANSACTION_TYPE | undefined {
    return TRANSACTION_TYPE[type.toUpperCase() as keyof typeof TRANSACTION_TYPE];
  }
  
  export function getTransactionTitle(type: TRANSACTION_TYPE): string {
    return TRANSACTION_TITLES[type];
  }