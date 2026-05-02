-- CreateEnum
CREATE TYPE "blog_category" AS ENUM ('game', 'tv', 'book', 'anime');

-- CreateEnum
CREATE TYPE "upcoming_kind" AS ENUM ('Reading', 'Watching', 'Playing');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "subtitle" VARCHAR(140) NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "blog_category" NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_public_id" TEXT NOT NULL,
    "image_alt" VARCHAR(180) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upcoming" (
    "id" TEXT NOT NULL,
    "kind" "upcoming_kind" NOT NULL,
    "subtitle" VARCHAR(120) NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_public_id" TEXT NOT NULL,
    "image_alt" VARCHAR(180) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "upcoming_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_category_created_at_idx" ON "blog_posts"("category", "created_at");

-- CreateIndex
CREATE INDEX "blog_posts_published_created_at_idx" ON "blog_posts"("published", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "upcoming_image_public_id_key" ON "upcoming"("image_public_id");

-- CreateIndex
CREATE INDEX "upcoming_kind_idx" ON "upcoming"("kind");
