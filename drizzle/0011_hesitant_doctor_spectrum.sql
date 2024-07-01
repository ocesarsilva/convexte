ALTER TABLE "convexte_leads" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "convexte_leads" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "convexte_leads" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "convexte_users" ADD COLUMN "firstName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "convexte_users" ADD COLUMN "lastName" varchar(255);