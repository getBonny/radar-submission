ALTER TABLE "receipt" ADD COLUMN "supplier_location" varchar;--> statement-breakpoint
ALTER TABLE "receipt" ADD COLUMN "language" varchar(64);--> statement-breakpoint
ALTER TABLE "receipt" ADD COLUMN "country" varchar(64);--> statement-breakpoint
ALTER TABLE "receipt" ADD COLUMN "currency" varchar(64);--> statement-breakpoint
ALTER TABLE "receipt" ADD COLUMN "quality_score" integer;--> statement-breakpoint
ALTER TABLE "receipt" ADD COLUMN "trust_score" integer;