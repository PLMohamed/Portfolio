-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image_url" varchar(255),
	"preview_link" varchar(255),
	"source_link" varchar(255),
	"download_link" varchar(255),
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100),
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
*/