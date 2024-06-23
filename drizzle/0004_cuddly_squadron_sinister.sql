ALTER TABLE "acme_companies" DROP CONSTRAINT "acme_companies_domain_unique";--> statement-breakpoint
ALTER TABLE "acme_companies" DROP COLUMN IF EXISTS "domain";