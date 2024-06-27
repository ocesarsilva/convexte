CREATE TABLE IF NOT EXISTS "convexte_forms" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"pipeline_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convexte_leads" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"pipeline_id" text NOT NULL,
	"form_id" text,
	"organization_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_forms" ADD CONSTRAINT "convexte_forms_pipeline_id_convexte_users_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."convexte_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_leads" ADD CONSTRAINT "convexte_leads_pipeline_id_convexte_users_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."convexte_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_leads" ADD CONSTRAINT "convexte_leads_form_id_convexte_users_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."convexte_users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_leads" ADD CONSTRAINT "convexte_leads_organization_id_convexte_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."convexte_organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
