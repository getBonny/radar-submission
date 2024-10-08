ALTER TABLE "transaction" DROP CONSTRAINT "transaction_receipt_id_receipt_id_fk";
--> statement-breakpoint
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_quest_status_id_quest_status_id_fk";
--> statement-breakpoint
ALTER TABLE "level" ALTER COLUMN "total_tokens" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "quest" ALTER COLUMN "points" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "quest" ALTER COLUMN "points" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "total_amount" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "receipt_item" ALTER COLUMN "amount" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "receipt_item" ALTER COLUMN "total_price" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "stats" ALTER COLUMN "total_earned" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "survey" ALTER COLUMN "points" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "tokens" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "tokens" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "type_info" jsonb;--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN IF EXISTS "timestamp";--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN IF EXISTS "blockchain_tx_id";--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN IF EXISTS "receipt_id";--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN IF EXISTS "quest_status_id";