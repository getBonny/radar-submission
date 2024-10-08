CREATE TABLE IF NOT EXISTS "level_to_benefits" (
	"level_id" integer NOT NULL,
	"benefit_id" integer NOT NULL,
	CONSTRAINT "level_to_benefits_level_id_benefit_id_pk" PRIMARY KEY("level_id","benefit_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "level_to_benefits" ADD CONSTRAINT "level_to_benefits_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "level_to_benefits" ADD CONSTRAINT "level_to_benefits_benefit_id_benefit_id_fk" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
