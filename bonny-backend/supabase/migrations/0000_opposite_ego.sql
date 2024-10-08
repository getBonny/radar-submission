CREATE TABLE IF NOT EXISTS "affiliate" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"language" varchar(255) DEFAULT 'en' NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"external_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "affiliate_status" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"affiliate_id" serial NOT NULL,
	"status" varchar(255) NOT NULL,
	"purchase_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answer" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"question_id" integer NOT NULL,
	"selected_option_id" integer,
	"free_text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupon" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"language" varchar(255) DEFAULT 'en' NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"details" text NOT NULL,
	"type" varchar(255) NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"image_url" text NOT NULL,
	"multiplier" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupon_statuses" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"coupon_id" integer NOT NULL,
	"status" varchar(255) NOT NULL,
	"redeem_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quest" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"language" varchar(255) DEFAULT 'en' NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"type" varchar(255) NOT NULL,
	"image_url" text NOT NULL,
	"external_url" text DEFAULT '' NOT NULL,
	"points" numeric DEFAULT '0' NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quest_status" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"quest_id" serial NOT NULL,
	"status" varchar(255) NOT NULL,
	"completed_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"survey_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_option" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"question_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipt" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"storage_url" text NOT NULL,
	"supplier_name" varchar(255) NOT NULL,
	"total_amount" numeric NOT NULL,
	"receipt_date" timestamp,
	"hash" varchar(64) NOT NULL,
	"transaction_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referral" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"referee_user_id" uuid NOT NULL,
	"referrer_user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_receipts" integer NOT NULL,
	"total_earned" numeric NOT NULL,
	"total_quests" integer NOT NULL,
	"total_coupons" integer NOT NULL,
	"total_users" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "survey" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"points" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"tokens" numeric NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"blockchain_tx_id" varchar(255) NOT NULL,
	"receipt_id" serial NOT NULL,
	"quest_status_id" serial NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"created_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"updated_by" varchar(255) DEFAULT 'anonymous' NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"phone_nr" varchar(255),
	"tokens" numeric NOT NULL,
	"user_name" varchar(255),
	"supporter_status" varchar(255),
	CONSTRAINT "user_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "affiliate_status" ADD CONSTRAINT "affiliate_status_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "affiliate_status" ADD CONSTRAINT "affiliate_status_affiliate_id_affiliate_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_selected_option_id_question_option_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."question_option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_statuses" ADD CONSTRAINT "coupon_statuses_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_statuses" ADD CONSTRAINT "coupon_statuses_coupon_id_coupon_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quest_status" ADD CONSTRAINT "quest_status_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quest_status" ADD CONSTRAINT "quest_status_quest_id_quest_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_survey_id_survey_id_fk" FOREIGN KEY ("survey_id") REFERENCES "public"."survey"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_option" ADD CONSTRAINT "question_option_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt" ADD CONSTRAINT "receipt_transaction_id_transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transaction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral" ADD CONSTRAINT "referral_referee_user_id_user_id_fk" FOREIGN KEY ("referee_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral" ADD CONSTRAINT "referral_referrer_user_id_user_id_fk" FOREIGN KEY ("referrer_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_receipt_id_receipt_id_fk" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_quest_status_id_quest_status_id_fk" FOREIGN KEY ("quest_status_id") REFERENCES "public"."quest_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
