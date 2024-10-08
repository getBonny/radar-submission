CREATE TABLE IF NOT EXISTS "benefit" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "level" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"total_tokens" numeric NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "profile_url" varchar;