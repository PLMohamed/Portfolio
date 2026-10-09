ALTER TABLE "projects"
ADD COLUMN "sort_order" integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects"
ADD COLUMN "stack" text [] DEFAULT '{}' NOT NULL;