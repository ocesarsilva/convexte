CREATE TABLE IF NOT EXISTS "convexte_organizations" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	"owner_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "convexte_organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DROP TABLE "convexte_companies";--> statement-breakpoint
ALTER TABLE "convexte_pipelines" DROP CONSTRAINT "convexte_pipelines_company_id_convexte_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "convexte_pipelines" ADD COLUMN "organization_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_organizations" ADD CONSTRAINT "convexte_organizations_owner_id_convexte_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."convexte_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_pipelines" ADD CONSTRAINT "convexte_pipelines_organization_id_convexte_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."convexte_organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "convexte_pipelines" DROP COLUMN IF EXISTS "company_id";