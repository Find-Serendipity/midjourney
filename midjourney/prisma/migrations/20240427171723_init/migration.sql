-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "parent_grid" INTEGER,
    "parent_id" TEXT,
    "batch_size" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "full_command" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "tagText" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_tags" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "images_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
