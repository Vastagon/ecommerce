/*
  Warnings:

  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Items";

-- CreateTable
CREATE TABLE "items" (
    "user_id" INTEGER NOT NULL DEFAULT 1,
    "name" VARCHAR NOT NULL,
    "imagePath" VARCHAR NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("user_id")
);
