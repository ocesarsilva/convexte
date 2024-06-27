ALTER TABLE "convexte_forms" ADD COLUMN "name" boolean;--> statement-breakpoint
ALTER TABLE "convexte_forms" ADD COLUMN "email" boolean;--> statement-breakpoint
ALTER TABLE "convexte_forms" ADD COLUMN "phone" boolean;--> statement-breakpoint
ALTER TABLE "convexte_forms" ADD COLUMN "date_of_birth" boolean;--> statement-breakpoint
ALTER TABLE "convexte_forms" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "convexte_forms" DROP COLUMN IF EXISTS "updated_at";