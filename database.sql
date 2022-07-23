CREATE database reviewdb;

CREATE TABLE "reviews" (
  "review_id" SERIAL PRIMARY KEY,
  "title" varchar,
  "content" varchar,
  "created_at" timestamp
);

ALTER TABLE "reviews" ALTER  "created_at" SET DEFAULT now();