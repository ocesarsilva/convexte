CREATE TABLE IF NOT EXISTS "convexte_users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"hashed_password" varchar(255),
	"avatar" varchar(255),
	"company_id" text,
	"stripe_subscription_id" varchar(191),
	"stripe_price_id" varchar(191),
	"stripe_customer_id" varchar(191),
	"stripe_current_period_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "convexte_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convexte_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convexte_password_reset_tokens" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convexte_email_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "convexte_email_verification_codes_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convexte_companies" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "convexte_companies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convexte_pipelines" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"image" text,
	"company_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "convexte_pipelines_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DROP TABLE "acme_users";--> statement-breakpoint
DROP TABLE "acme_sessions";--> statement-breakpoint
DROP TABLE "acme_password_reset_tokens";--> statement-breakpoint
DROP TABLE "acme_email_verification_codes";--> statement-breakpoint
DROP TABLE "acme_companies";--> statement-breakpoint
DROP TABLE "acme_pipelines";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "convexte_users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "convexte_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_token_user_idx" ON "convexte_password_reset_tokens" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_user_idx" ON "convexte_email_verification_codes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_email_idx" ON "convexte_email_verification_codes" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_users" ADD CONSTRAINT "convexte_users_company_id_convexte_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "convexte_companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convexte_pipelines" ADD CONSTRAINT "convexte_pipelines_company_id_convexte_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "convexte_companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
