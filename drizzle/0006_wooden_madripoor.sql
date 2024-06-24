ALTER TABLE "convexte_users" DROP CONSTRAINT "convexte_users_company_id_convexte_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "convexte_companies" ADD COLUMN "owner_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_companies" ADD CONSTRAINT "convexte_companies_owner_id_convexte_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."convexte_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "convexte_users" DROP COLUMN IF EXISTS "company_id";