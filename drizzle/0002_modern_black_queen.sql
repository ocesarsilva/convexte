CREATE TABLE IF NOT EXISTS "acme_companies" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"domain" text,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "acme_companies_slug_unique" UNIQUE("slug"),
	CONSTRAINT "acme_companies_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_pipelines" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"image" text,
	"company_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "acme_pipelines_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DROP TABLE "companies";--> statement-breakpoint
DROP TABLE "pipelines";--> statement-breakpoint
ALTER TABLE "acme_users" DROP CONSTRAINT "acme_users_company_id_companies_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "acme_users" ADD CONSTRAINT "acme_users_company_id_acme_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "acme_companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "acme_pipelines" ADD CONSTRAINT "acme_pipelines_company_id_acme_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "acme_companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
