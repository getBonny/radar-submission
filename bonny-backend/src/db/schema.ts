import { affiliate, affiliateStatus, AffiliateType, AffiliateStatusType } from "./schema/affiliate";
export { affiliate, affiliateStatus, AffiliateType, AffiliateStatusType };

import { answer, AnswerType } from "./schema/answer";
export { answer, AnswerType };

import { auditable, AuditableType } from "./schema/auditable";
export { auditable, AuditableType };

import { coupon, couponStatus, CouponType, CouponStatusType } from "./schema/coupon";
export { coupon, couponStatus, CouponType, CouponStatusType };

import { user, UserType } from "./schema/user";
export { user, UserType };

import { quest, questStatus, QuestType, QuestStatusType } from "./schema/quest";
export { quest, questStatus, QuestType, QuestStatusType };

import { question, questionOption, QuestionType, QuestionOptionType } from "./schema/question";
export { question, questionOption, QuestionType, QuestionOptionType };

import { referral, ReferralType } from "./schema/referral";
export { referral, ReferralType };

import { receipt, receiptRelations, ReceiptType, receiptItem, receiptItemRelations, ReceiptItemType } from "./schema/receipt";
export { receipt, ReceiptType, receiptRelations, receiptItem, ReceiptItemType, receiptItemRelations };

import { stats, StatsType } from "./schema/stats";
export { stats, StatsType };

import { survey, SurveyType } from "./schema/survey";
export { survey, SurveyType};

import { transaction, TransactionType } from "./schema/transaction";
export { transaction, TransactionType };

import { level,levelRelations, LevelType, benefit, benefitRelations, BenefitType, levelToBenefits, levelToBenefitsRelations } from "./schema/levels";
export { level, benefit, levelRelations, benefitRelations, levelToBenefits, levelToBenefitsRelations }


export interface Affiliate extends AffiliateType {}
export interface AffiliateStatus extends AffiliateStatusType {}
export interface Answer extends AnswerType {}
export interface Auditable extends AuditableType {}
export interface Coupon extends CouponType {}
export interface CouponStatus extends CouponStatusType {}
export interface User extends UserType {}
export interface Quest extends QuestType {}
export interface QuestStatus extends QuestStatusType {}
export interface Question extends QuestionType {}
export interface QuestionOption extends QuestionOptionType {}
export interface Referral extends ReferralType {}

export interface Receipt extends ReceiptType {
    items: ReceiptItem[]
}
export interface ReceiptItem extends ReceiptItemType{}

export interface Stats extends StatsType {}
export interface Survey extends SurveyType {}
export interface Transaction extends TransactionType {}

export interface Level extends LevelType {
    benefits: Benefit[]
}
export interface Benefit extends BenefitType {}