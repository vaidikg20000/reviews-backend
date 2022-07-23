CREATE database reviewdb;

CREATE TABLE "reviews" (
  "review_id" SERIAL PRIMARY KEY,
  "title" varchar,
  "content" varchar,
  "created_at" timestamp
);

ALTER TABLE "users" ALTER  "created_at" SET DEFAULT now();

-- EDIT-
-- UPDATE reviews SET (title = $1 , content = $2) WHERE review_id = $3;