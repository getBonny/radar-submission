CREATE TABLE IF NOT EXISTS "receipt_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"receipt_id" integer,
	"description" varchar NOT NULL,
	"amount" numeric,
	"total_price" numeric
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt_item" ADD CONSTRAINT "receipt_item_receipt_id_receipt_id_fk" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
