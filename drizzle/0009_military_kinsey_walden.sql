ALTER TABLE "convexte_leads" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "convexte_leads" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "convexte_forms" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "convexte_forms" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "convexte_forms" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "convexte_leads" DROP COLUMN IF EXISTS "image";