ALTER TABLE "user" ALTER COLUMN "supporter_status" SET DEFAULT 'Newbie';--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone_nr";